<template>
  <div>
    <v-btn rounded
           color="light-blue darken-3"
           dark
           class="mt-3 ml-3">引入</v-btn>
    <v-btn rounded
           color="teal darken-1"
           dark
           class="mt-3 ml-3">儲存</v-btn>
    <AutoForm :combine="item"
              v-for="item in combine "
              :key="item.title" />
  </div>
</template>

<script>
import AutoForm from "../AutoForm";
import 借款人Data from "../../../json/進件作業/借款人/Data/借款人Data";
import 借款人Template from "../../../json/進件作業/借款人/Template/借款人Template.json";
import 單據寄交方式Data from "../../../json/進件作業/借款人/Data/單據寄交方式Data.json";
import 單據寄交方式Template from "../../../json/進件作業/借款人/Template/單據寄交方式Template.json";
export default {
  components: {
    AutoForm
  },
  data: () => ({
    combine: []
  }),
  created() {
    this.combine = [
      {
        title: "基本資料",
        template: 借款人Template,
        data: 借款人Data
      },
      {
        title: "單據寄交方式",
        template: 單據寄交方式Template,
        data: 單據寄交方式Data
      }
    ];
  }
};
</script>