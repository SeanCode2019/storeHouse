<template>
  <v-app>
    <v-container fluid grid-list-xs>
      <top :data="templates.top"></top>
      <tabs :tabsInfo="data.tabs">
        <autoForm slot="content" :data="currTemplate"></autoForm>
      </tabs>
    </v-container>
  </v-app>
</template>

<script>
import { templates } from "../js/allTemplates";
import { data } from "../js/allData";
import autoForm from "./components/AutoForm";
import top from "./components/Top";
import tabs from "./components/Tabs";

// let currData = data.borrower
// let currTemplate = templates.borrower

let currData = {};
let currTemplate = {};

export default {
  name: "App",
  components: {
    top,
    tabs,
    autoForm
  },
  data: () => ({
    //all template and data
    templates,
    data,
    //當前的template and data
    currTemplate,
    currData
  }),
  methods: {},
  computed: {},
  beforeCreate() {
    SelectTemplateAndData("borrower");
  },
  mounted() {
    CombineDataWithTemplate(currTemplate, currData);
    CombineDataWithTemplate(templates.top, data.top);
  }
};

//select current template and data
function SelectTemplateAndData(_term) {
  currTemplate = templates[_term];
  currData = data[_term];
}

function CombineDataWithTemplate(_template, _Data) {
  for (let i = 0; i < _template.length; i++) {
    for (let j = 0; j < _template[i].items.length; j++) {
      //用template裡的field，對應到data內的prop
      let dataProp = _template[i].items[j].field;
      _template[i].items[j].value = _Data[dataProp];
    }
  }
}
</script>

<style lang="scss" scoped>
.v-chip {
  height: 70px !important;
  font-size: 70px;
  width: inherit;
  display: block;
  white-space: normal;
}
</style>