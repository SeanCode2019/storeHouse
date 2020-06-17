<template>
  <div>
    <v-btn rounded
           color="light-blue darken-3"
           dark
           class="mt-3 ml-3">引入</v-btn>
    <v-btn rounded
           color="light-blue darken-3"
           dark
           class="mt-3 ml-3">新增</v-btn>
    <DataTable :datas="combine" />
  </div>
</template>

<script>
import DataTable from "../DataTable";
import 保證人Data from "../../../json/進件作業/保證人/Data/保證人Data.json";
import 保證人Template from "../../../json/進件作業/保證人/Template/保證人Template.json";
export default {
  components: {
    DataTable
  },
  data: () => ({
    combine: []
  }),
  created() {
    this.combine = {
      title: "保證人明細",
      template: 保證人Template,
      data: 保證人Data
    };
  }
};
</script>