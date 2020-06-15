<template>
  <v-container fluid>
    <v-data-iterator :items="items"
                     item-key="name"
                     :items-per-page="4"
                     hide-default-footer>
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col cols="12"
                 v-for="(data,i) in items"
                 :key="i">
            <v-card>
              <v-switch :input-value="!isExpanded(data)"
                        :label="data.label"
                        class="pl-4 mt-0"
                        @change="(v) => expand(data, !v)"></v-switch>
              <v-divider></v-divider>
              <v-row class="ma-3 border"
                     v-if="!isExpanded(data)"
                     dense>
                <template v-for="(item,i) in template">
                  <v-col :cols="item.cols.sm"
                         :md="item.cols.md"
                         :lg="item.cols.lg"
                         :xl="item.cols.xl"
                         :key="i">
                    <v-row>
                      <v-col :cols="item.labelCols">
                        <v-chip class="ma-2 body-2 light-blue darken-3 "
                                label
                                dark>
                          {{item.label}}
                        </v-chip>
                      </v-col>
                      <template v-for="(sub,i) in item.items">
                        <v-col :cols="sub.cols"
                               :key="i">
                          <v-text-field v-if="sub.type==='input'"
                                        v-model="sub.value"
                                        :prefix="sub.prefix"
                                        :suffix="sub.suffix"></v-text-field>
                          <v-textarea v-else-if="sub.type==='textArea'"
                                      solo
                                      :value="sub.value"></v-textarea>
                          <v-radio-group v-else-if="sub.type==='checkbox'"
                                         v-model="sub.value"
                                         row>
                            <v-radio v-for="third in sub.selects"
                                     :label="third"
                                     :value="third"
                                     :key="third"></v-radio>
                          </v-radio-group>
                          <v-select v-else-if="sub.type==='select'"
                                    :items="sub.selects"
                                    :label="'請選擇'"
                                    :value="sub.value"
                                    v-model="sub.value"
                                    solo></v-select>
                          <Datepicker v-else-if="sub.type==='date'"
                                      :data="sub"
                                      v-on:ChangeDate="GetDate" />
                        </v-col>
                      </template>
                    </v-row>
                  </v-col>
                </template>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>

</template>
<script>
import Datepicker from "./Datepicker";
import { mapFields } from "vuex-map-fields";

export default {
  props: ["combine"],
  name: "autoForm",
  components: {
    Datepicker
  },
  data: () => ({
    items: [],
    data: null,
    template: null
  }),
  mounted() {
    if (this.combine.data !== null) {
      this.items = [];
      this.data = this.combine.data;
      this.template = this.combine.template;
      CombineDataToTemplate(this.data, this.template);
      this.items.push({
        label: this.combine.title,
        template: this.template
      });
    }
  },
  methods: {
    GetDate(_data, _date) {
      this.data[0][_data.title] = _date;
    }
  },
  computed: {
    ...mapFields(["subPage"])
  },
  watch: {
    data: {
      deep: true,
      handler() {
        CombineDataToTemplate(this.data, this.template);
      }
    },

    template: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        CombineTemplateToData(this.template, this.data);
      }
    }
  }
};

//把db的資料存進template
async function CombineDataToTemplate(_from, _to) {
  await _to.forEach(element => {
    element.items.forEach(item => {
      item.value = _from[0][item.title];
    });
  });
}

//把template的資料存進db
async function CombineTemplateToData(_from, _to) {
  await _from.forEach(from => {
    from.items.forEach(data => {
      _to[0][data.title] = from.items.find(x => x.title === data.title).value;
    });
  });
}
</script>

<style lang="scss" scoped>
.v-chip.v-size--default {
  height: 50px !important;
  font-size: 15px;
  text-align: center;
  display: block;
  word-break: break-all;
  white-space: normal;
  height: auto;
}
</style>