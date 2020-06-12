<template>
  <v-app>
    <v-container fluid grid-list-xs>
      <autoForm :data="template"></autoForm>
    </v-container>
  </v-app>
</template>

<script>
import 借款人Data from "../json/進件作業/借款人Data.json";
import 借款人Template from "../json/進件作業/借款人Template.json";
import autoForm from "./components/AutoForm";

let template = 借款人Template;
let myData = 借款人Data;

export default {
  name: "App",
  components: {
    autoForm
  },
  data: () => ({
    template,
    myData
  }),
  methods: {},
  computed: {},
  mounted() {
    CombineDataWithTemplate(template, myData);
  }
};

function CombineDataWithTemplate(_template, _Data) {
  for (let i = 0; i < _template.length; i++) {
    for (let j = 0; j < template[i].items.length; j++) {
      let currDate = _Data.find(x => x.title === _template[i].items[j].title);
      _template[i].items[j].value = currDate.value;
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