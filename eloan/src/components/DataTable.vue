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
                <v-data-table :headers="headers"
                              :items="rowDatas"
                              class="elevation-1">
                  <template v-slot:top>
                    <v-toolbar flat
                               color="white">
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog"
                                max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary"
                                 dark
                                 absolute
                                 left
                                 class="mb-2"
                                 v-bind="attrs"
                                 v-on="on">New Item</v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12"
                                       sm="6"
                                       md="4"
                                       v-for="(item,i) in headers"
                                       :key="i"
                                       :style="{display: item.value=='actions'?'none':'block'}">
                                  <v-text-field :v-model="editedItem[item.value]"
                                                :label="item.text"></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1"
                                   text
                                   @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1"
                                   text
                                   @click="save">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn v-for="btn in buttons"
                           :key="btn.text"
                           small
                           class="mr-2"
                           @click="editItem(item)">
                      {{btn.text}}
                    </v-btn>
                  </template>
                </v-data-table>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>


<script>
export default {
  props: ["datas"],
  data: () => ({
    dialog: false,
    headers: [],
    items: [],
    editedIndex: -1,
    rowDatas: [],
    editedItem: {},
    defaultItem: {},
    buttons: []
  }),
  mounted() {
    if (this.datas.data !== null) {
      this.items = [];
      this.items.push({
        label: this.datas.title,
        datas: this.datas.data
      });
      this.rowDatas = this.datas.data;
      this.headers = this.datas.template[0].datas;
      this.buttons = this.datas.template[0].buttons;
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {},
    editItem(item) {
      this.editedIndex = this.rowDatas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.rowDatas.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.rowDatas.splice(index, 1);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.rowDatas[this.editedIndex], this.editedItem);
      } else {
        this.rowDatas.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style scoped>
.v-data-table {
  width: 100%;
  margin-bottom: 3vh;
}
</style>