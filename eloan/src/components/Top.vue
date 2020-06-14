<template>
  <v-row>
    <v-col xl="3">
      <v-btn small class="white--text" color="blue darken-1">傳送</v-btn>
      <v-btn small class="white--text" color="blue darken-1">退件</v-btn>
      <v-btn small class="white--text ml-1" color="blue darken-1">批覆更正</v-btn>
      <v-btn small class="white--text ml-1" color="blue darken-1">人工結案</v-btn>
      <v-btn small class="white--text ml-1" color="blue darken-1">列印</v-btn>
      <v-btn small class="white--text ml-1" color="blue darken-1">離開</v-btn>
    </v-col>
    <v-col>
      <autoForm :data="data"></autoForm>
    </v-col>
  </v-row>
</template>
<script>
import autoForm from "./AutoForm";

export default {
  name: "top",
  props: ["data"],
  components: { autoForm },
  methods: {}
};
</script>