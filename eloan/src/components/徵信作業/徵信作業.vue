<template>
  <div>
    <Tabs :items="tabs" />
    <router-view></router-view>
  </div>
</template>
<script>
// import form from "../AutoForm";
import Tabs from "../Tabs";
export default {
  components: {
    Tabs
  },
  data: () => ({
    tabs: [
      { text: "行內查詢", to: "InlineQuery" },
      { text: "聯徵查詢", to: "JointQuery" },
      { text: "票信查詢", to: "TicketQuery" },
      { text: "DBR/支出所得比試算", to: "IncomeRatio" },
      { text: "關係歸戶表", to: "Relationship" },
      { text: "警示名單", to: "AlertList" },
      { text: "標籤比對", to: "Comparison" }
    ]
  }),
  methods: {},
  computed: {}
};
</script>