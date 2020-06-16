<template>
  <div>
    <Tabs :items="tabs" />
    <v-divider></v-divider>
    <template v-for="item in combine">
      <AutoForm v-if="item.type==='form'"
                :combine="item"
                :key="item.title" />
      <DataTable v-else-if="item.type=='table'"
                 :datas="item"
                 :key="item.title" />
    </template>
  </div>
</template>
<script>
import Tabs from "./Tabs";
import AutoForm from "./AutoForm";
import DataTable from "./DataTable";
import { mapFields } from "vuex-map-fields";
import 申請資訊Data from "../../json/進件作業/Data/申請資訊Data.json";
import 申請資訊Template from "../../json/進件作業/Template/申請資訊Template.json";
import 借款人Data from "../../json/進件作業/Data/借款人Data.json";
import 借款人Template from "../../json/進件作業/Template/借款人Template.json";
import 申請案件Data from "../../json/進件作業/Data/申請案件Data.json";
import 申請案件Template from "../../json/進件作業/Template/申請案件Template.json";

export default {
  components: {
    Tabs,
    AutoForm,
    DataTable
  },
  data: () => ({
    tabs: [
      {
        text: "申請資訊",
        href: "",
        subPage: { text: "申請資訊", value: "FeedOperation" }
      },
      {
        text: "申請案件",
        href: "",
        subPage: { text: "申請案件", value: "ApplicationCase" }
      },
      {
        text: "借款人",
        href: "",
        subPage: { text: "借款人", value: "Borrower" }
      },
      {
        text: "保護人",
        href: "",
        subPage: { 保護人: "申請資訊", value: "FeedOperation" }
      }
    ],
    template: null,
    data: null
  }),
  watch: {
    subPage() {
      this.ChangeSub(this.subPage);
    }
  },
  computed: {
    ...mapFields(["subPage", "combine"])
  },
  beforeMount() {
    this.combine = [{ template: 申請資訊Template, data: 申請資訊Data }];
  },
  mounted() {
    this.ChangeSub(this.subPage);
  },
  methods: {
    ChangeSub(_page) {
      switch (_page.value) {
        case "FeedOperation":
          this.combine = [];
          this.combine.push({
            title: "申請資訊",
            type: "form",
            template: 申請資訊Template,
            data: 申請資訊Data
          });
          this.combine.push({
            title: "申請資訊2",
            type: "form",
            template: 申請資訊Template,
            data: 申請資訊Data
          });
          break;
        case "ApplicationCase":
          this.combine = [];
          this.combine.push({
            title: "申請案件",
            type: "table",
            template: 申請案件Template,
            data: 申請案件Data
          });
          break;
        case "Borrower":
          this.combine = [];
          this.combine.push({
            title: "借款人",
            type: "form",
            template: 借款人Template,
            data: 借款人Data
          });
          break;
        default:
          this.template = 申請資訊Template;
          this.data = 申請資訊Data;
          break;
      }
    }
  }
};
</script>