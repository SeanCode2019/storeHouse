<template>
  <div>
    <Tabs :items="tabs" />
    <v-divider></v-divider>
    <template v-for="item in combine">
      <AutoForm :combine="item"
                :key="item.title" />
    </template>
  </div>
</template>
<script>
import Tabs from "./Tabs";
import AutoForm from "./AutoForm";
import { mapFields } from "vuex-map-fields";
import 申請資訊Data from "../../json/進件作業/Data/申請資訊Data.json";
import 申請資訊Template from "../../json/進件作業/Template/申請資訊Template.json";
import 借款人Data from "../../json/進件作業/Data/借款人Data.json";
import 借款人Template from "../../json/進件作業/Template/借款人Template.json";

export default {
  components: {
    Tabs,
    AutoForm
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
        subPage: { text: "申請案件", value: "FeedOperation" }
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
            template: 申請資訊Template,
            data: 申請資訊Data
          });
          this.combine.push({
            title: "申請資訊2",
            template: 申請資訊Template,
            data: 申請資訊Data
          });
          break;
        case "Borrower":
          this.combine = [];
          this.combine.push({
            title: "借款人",
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