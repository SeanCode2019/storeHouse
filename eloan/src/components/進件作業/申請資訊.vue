<template>
  <div>
    <v-btn rounded
           color="teal darken-1"
           dark
           class="mt-3 ml-3">儲存</v-btn>
    <AutoForm :combine="combine" />
  </div>
</template>

<script>
import AutoForm from "../AutoForm";
import 申請資訊Data from "../../../json/進件作業/申請資訊/Data/申請資訊Data";
import 申請資訊Template from "../../../json/進件作業/申請資訊/Template/申請資訊Template.json";
export default {
  components: {
    AutoForm
  },
  data: () => ({
    combine: []
  }),
  created() {
    this.combine = {
      title: "申請資訊",
      template: 申請資訊Template,
      data: 申請資訊Data
    };
  }
};
</script>