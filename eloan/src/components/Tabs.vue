<template>
  <v-tabs>
    <router-link v-for="(item,i) in items"
                 :key="i"
                 :to="{name:`${item.to}`}"
                 append>
      <v-tab>
        {{item.text}}
      </v-tab>
    </router-link>
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
<style scoped>
a {
  text-decoration: none !important;
}
.v-tab {
  height: 100%;
}
</style>