<template>
  <v-container fluid>
    <v-data-iterator :items="items" item-key="name" :items-per-page="4" hide-default-footer>
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col cols="12" v-for="(data,i) in items" :key="i">
            <v-card>
              <v-switch
                :input-value="!isExpanded(data)"
                :label="data.label"
                class="pl-4 mt-0"
                @change="(v) => expand(data, !v)"
              ></v-switch>
              <v-divider></v-divider>
              <!-- 擔保品資料 data table內容 -->
              <v-row class="ma-3 border" v-if="!isExpanded(data)" dense>
                <v-btn rounded color="teal darken-1" dark>{{'擔保品引進'}}</v-btn>
                <v-btn rounded color="teal darken-1" class="ml-2" dark>{{'儲存'}}</v-btn>
                <v-data-table
                  :headers="dataTables.collaterallInfo.headers"
                  :items="dataTables.collaterallInfo.rowDatas"
                  class="elevation-1 mt-3"
                >
                  <template v-slot:item.actions="{ }">
                    <v-btn
                      v-for="btn in dataTables.collaterallInfo.buttons"
                      :key="btn.text"
                      small
                      class="mr-2"
                    >{{btn.text}}</v-btn>
                  </template>
                  <template v-slot:item.State="{ }">
                    <v-btn small>{{'調查表'}}</v-btn>
                  </template>
                  <template v-slot:item.Order="{item}">
                    <v-text-field v-model="item.Order"></v-text-field>
                  </template>
                  <template v-slot:item.LoanLimit="{item}">
                    <v-text-field v-model="item.LoanLimit"></v-text-field>
                  </template>
                  <template v-slot:item.SetLimits="{item}">
                    <v-text-field v-model="item.SetLimits"></v-text-field>
                  </template>
                  <template v-slot:item.MortgageType="{item}">
                    <v-select
                      :items="[]"
                      :label="'抵押權種類'"
                      :item-value="[]"
                      v-model="item.MortgageType"
                      solo
                    ></v-select>
                  </template>
                  <template v-slot:item.Holder="{item}">
                    <v-select
                      :items="selects.holderAndUser.items"
                      :item-value="selects.holderAndUser.itemValue"
                      v-model="item.Holder"
                      solo
                    ></v-select>
                  </template>
                  <template v-slot:item.User="{item}">
                    <v-select
                      :items="selects.holderAndUser.items"
                      :item-value="selects.holderAndUser.itemValue"
                      v-model="item.User"
                      solo
                    ></v-select>
                  </template>
                </v-data-table>

                <Tabs :items="tabs" />
                <v-btn class="mt-3" rounded color="teal darken-1" dark>{{'額度連結'}}</v-btn>
                <!-- 額度連結 -->
                <v-data-table
                  :headers="dataTables.quotaLink.headers"
                  :items="dataTables.quotaLink.rowDatas"
                  class="elevation-1 mt-3"
                >
                  <template v-slot:item.actions="{ }">
                    <v-btn
                      v-for="btn in dataTables.collaterallInfo.buttons"
                      :key="btn.text"
                      small
                      class="mr-2"
                    >{{btn.text}}</v-btn>
                  </template>
                  <!-- 擔保方式 -->
                  <template v-slot:item.CollateralMethod="{item}">
                    <v-select
                      :items="selects.collateralMethod.items"
                      :item-value="selects.collateralMethod.items"
                      v-model="item.CollateralMethod"
                      solo
                    ></v-select>
                  </template>
                </v-data-table>
                <!-- 車輛資料 -->
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import 擔保品資料Template from "../../../json/擔保品資料/Template/擔保品資料Template.json";
import 擔保品資料Data from "../../../json/擔保品資料/Data/擔保品資料Data.json";
import 額度連結Template from "../../../json/擔保品資料/Template/額度連結Template.json";
import 額度連結Data from "../../../json/擔保品資料/Data/額度連結Data.json";
import Tabs from "../Tabs";

export default {
  props: [],
  components: { Tabs },
  data: () => ({
    collaterallInfo: {
      title: "擔保品資料",
      template: 擔保品資料Template,
      data: 擔保品資料Data
    },
    selects: {
      holderAndUser: {
        items: ["1-本人(含共同持有)", "2-配偶", "3-未成年子女", "4-其他"],
        itemValue: ["self", "couple", "child", "others"]
      },
      collateralMethod: {
        items: ["正擔保"],
        itemValue: ["positive"]
      }
    },
    dialog: false,
    dataTables: {
      collaterallInfo: {
        headers: [],
        rowDatas: [],
        buttons: []
      },
      quotaLink: {
        headers: 額度連結Template[0].datas,
        rowDatas: 額度連結Data,
        buttons: 額度連結Template[0].buttons
      }
    },
    items: [],
    tabs: [
      { text: "額度連結", href: "" },
      { text: "車輛資料", href: "" }
    ]
  }),
  methods: {
    ChangePage: function(_item) {
      if (_item.subPage !== undefined) {
        this.subPage = _item.subPage;
      }
    }
  },
  watch: {
    subPage() {
      this.ChangeSub(this.subPage);
    }
  },
  computed: {
    ...mapFields(["subPage", "combine"])
  },
  beforeMount() {
    this.combine = [{ template: 擔保品資料Template, data: 擔保品資料Data }];
  },
  mounted() {
    this.items = [];
    this.items.push({
      label: this.collaterallInfo.title,
      datas: this.collaterallInfo.data
    });
    // 擔保品資料
    this.dataTables.collaterallInfo.rowDatas = this.collaterallInfo.data;
    this.dataTables.collaterallInfo.headers = this.collaterallInfo.template[0].datas;
    this.dataTables.collaterallInfo.buttons = this.collaterallInfo.template[0].buttons;
  }
};
</script>

<style scoped>
.v-data-table {
  width: 100%;
  margin-bottom: 3vh;
}
</style>