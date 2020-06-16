<template>
  <v-app>
    <v-container fluid
                 grid-list-xs>
      <Header />
      <Tabs :items="tabs" />
      <v-divider></v-divider>
      <router-view></router-view>
      <!-- <FeedOperation /> -->
    </v-container>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Tabs from "./components/Tabs";
// import FeedOperation from "./components/FeedOperation";

export default {
  title: "App",
  components: {
    Header,
    Tabs
    // FeedOperation
  },
  data: () => ({
    tabs: [
      { text: "進件作業", to: "FeedOperation" },
      { text: "徵信作業", to: "CreditWork" }
      // { text: "擔保品資料", to: "CollateralInformation" },
      // { text: "授信作業", to: "CreditAssignment" },
      // { text: "信用評等", to: "CreditRate" },
      // { text: "附表資料", to: "ScheduleInformation" },
      // { text: "檢附文件", to: "AttachDocument" },
      // { text: "批覆作業", to: "Approval" },
      // { text: "批覆書上傳", to: "ApprovalUpload" },
      // { text: "案件記錄", to: "CaseRecord" }
    ]
  }),
  methods: {},
  computed: {}
};
</script>

