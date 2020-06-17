<template>
  <v-container fluid>
    <v-data-iterator :items="items"
                     item-key="name"
                     :items-per-page="4"
                     hide-default-footer>
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-card>
          <v-switch :input-value="!isExpanded(items)"
                    :label="items.label"
                    class="pl-4 pt-4 mt-0 teal lighten-5 font-weight-bold"
                    @change="(v) => expand(items, !v)"></v-switch>
          <v-divider></v-divider>
          <v-row class="ma-3 border"
                 v-if="!isExpanded(items)"
                 dense>
            <template v-for="(item,i) in template">
              <v-col :cols="item.mainPart.cols.sm"
                     :md="item.mainPart.cols.md"
                     :lg="item.mainPart.cols.lg"
                     :xl="item.mainPart.cols.xl"
                     :key="i">
                <v-row>
                  <v-col v-if="item.label.text !==''"
                         :cols="item.label.cols.sm"
                         :md="item.label.cols.md"
                         :lg="item.label.cols.lg"
                         :xl="item.label.cols.xl">
                    <v-chip class="ma-2 body-2 light-blue darken-3 "
                            label
                            dark>
                      {{item.label.text}}
                    </v-chip>
                  </v-col>
                  <template v-for="(sub,i) in item.items">
                    <v-col :cols="sub.cols.sm"
                           :md="sub.cols.md"
                           :lg="sub.cols.lg"
                           :xl="sub.cols.xl"
                           :key="i">
                      <v-text-field v-if="sub.type==='input'"
                                    v-model="sub.value"
                                    :label="sub.label"
                                    :filled="sub.filled"
                                    :readonly="sub.readonly"
                                    :placeholder="sub.placeholder"
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
                                :item-value="sub.value"
                                :suffix="sub.suffix"
                                v-model="sub.value"
                                solo></v-select>
                      <Datepicker v-else-if="sub.type==='date'"
                                  :data="sub"
                                  v-on:ChangeDate="GetDate" />
                      <v-btn v-else-if="sub.type==='button'"
                             :class="sub.class"
                             @click="handle_function_call(sub.action)"
                             dark
                             rounded>
                        {{sub.text}}
                      </v-btn>
                    </v-col>
                  </template>
                </v-row>
              </v-col>
            </template>
          </v-row>
        </v-card>

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
    },
    handle_function_call(function_name) {
      this[function_name]();
    },
    SameAddress
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
function CombineDataToTemplate(_from, _to) {
  _to.forEach(element => {
    element.items.forEach(item => {
      item.value = _from[0][item.title];
    });
  });
}

//把template的資料存進db
function CombineTemplateToData(_from, _to) {
  _from.forEach(from => {
    from.items.forEach(data => {
      if (data.type !== "button") {
        _to[0][data.title] = from.items.find(x => x.title === data.title).value;
      }
    });
  });
}

function SameAddress() {
  let household = [
    "AddressType",
    "PhoneCode",
    "PhoneNum",
    "postalCode",
    "County",
    "region",
    "village",
    "adjacent",
    "road",
    "roadType",
    "segment",
    "lane",
    "alley",
    "num",
    "numOf",
    "floor",
    "Of",
    "room"
  ];

  household.forEach(item => {
    this.data[0][`Contact${item}`] = this.data[0][item];
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