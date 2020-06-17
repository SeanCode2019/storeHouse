<template>
  <div>
    <v-btn rounded
           color="light-blue darken-3"
           dark
           class="mt-3 ml-3">新增</v-btn>
    <DataTable :datas="combine" />
  </div>
</template>

<script>
import DataTable from "../DataTable";
import 申請案件Data from "../../../json/進件作業/申請案件/Data/申請案件Data";
import 申請案件Template from "../../../json/進件作業/申請案件/Template/申請案件Template.json";
export default {
  components: {
    DataTable
  },
  data: () => ({
    combine: []
  }),
  created() {
    this.combine = {
      title: "申請資訊",
      template: 申請案件Template,
      data: 申請案件Data
    };
  }
};
</script>