<template>
  <v-tabs>
    <v-tab v-for="(item,i) in items"
           :key="i"
           @click="ChangePage(item)"
           :href="item.href">{{item.text}}</v-tab>
  </v-tabs>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  props: ["items"],
  methods: {
    ChangePage: function(_item) {
      if (_item.subPage !== undefined) {
        this.subPage = _item.subPage;
      }
    }
  },
  computed: {
    ...mapFields(["subPage"])
  }
};
</script>