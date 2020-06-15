<template>
  <v-card class="px-3">
    <v-row >
      <v-col>
        <v-card>
          <v-toolbar flat>
            <v-tabs>
              <v-tab v-for="(tab, index) in tabsInfo" :key="index">
                <div class="primary--text">{{tab}}</div>
              </v-tab>
            </v-tabs>
          </v-toolbar>
          <slot name="content"></slot>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["tabsInfo"],
  data: () => ({})
};
</script>