<template>
  <v-app>
    <v-container fluid grid-list-xs>
      <top :data="data.top"></top> 
      <autoForm :data="currTemplate"></autoForm>
    </v-container>
  </v-app>
</template>

<script>
import {templates} from "../js/allTemplates";
import {data} from "../js/allData";
import autoForm from "./components/AutoForm";
import top from "./components/Top";

// let currData = data.borrower
// let currTemplate = templates.borrower

let currData = 1
let currTemplate = 1

export default {
  name: "App",
  components: {
    top,
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
  beforeCreate(){
    Initialize()
  },
  mounted() {
    CombineDataWithTemplate(currTemplate, currData);
  }
};

//select default template and data
function Initialize() {
  currTemplate = templates.borrower
  currData = data.borrower
}

function CombineDataWithTemplate(_template, _Data) {
  for (let i = 0; i < _template.length; i++) {
    for (let j = 0; j < _template[i].items.length; j++) {
      //用template裡的field，對應到data內的prop
      let dataProp = _template[i].items[j].field
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