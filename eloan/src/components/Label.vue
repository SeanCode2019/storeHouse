<template>
<!-- <v-col cols="2"> -->
  <v-col :cols="labelData.class">
    <v-chip class="ma-2" color="blue" label outlined>{{labelData.label}}</v-chip>
  </v-col>
</template>

<script>
export default {
  props: ["labelData"],
  data: () => ({})
};
</script>