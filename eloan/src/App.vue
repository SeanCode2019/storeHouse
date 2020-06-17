<template>
  <v-app>
    <v-container fluid
                 grid-list-xs>
      <Header />
      <Tabs :items="tabs" />
      <v-divider></v-divider>
      <FeedOperation v-show="false" />
      <CollateralInfo/>
    </v-container>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import FeedOperation from "./components/FeedOperation";
import CollateralInfo from "./components/擔保品資料/CollateralInfo";

export default {
  title: "App",
  components: {
    Header,
    Tabs,
    FeedOperation,
    CollateralInfo
  },
  data: () => ({
    tabs: [
      { text: "進貨作業", href: "" },
      { text: "徵信作業", href: "" },
      { text: "擔保品資料", href: "" },
      { text: "授信作業", href: "" },
      { text: "信用評等", href: "" },
      { text: "附表文件", href: "" },
      { text: "檢附文件", href: "" },
      { text: "批覆作業", href: "" },
      { text: "批覆書上傳", href: "" },
      { text: "案件記錄", href: "" }
    ]
  }),
  methods: {},
  computed: {}
};
</script>

