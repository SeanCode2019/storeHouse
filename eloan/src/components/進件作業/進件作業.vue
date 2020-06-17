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
      { text: "申請資訊", to: "ApplicationInformation" },
      { text: "申請案件", to: "ApplicationCase" },
      { text: "借款人", to: "Borrower" },
      { text: "保證人", to: "Guarantor" }
    ]
  }),
  methods: {},
  computed: {}
};
</script>