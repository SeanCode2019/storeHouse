<template>
  <v-row>
    <v-col class="ml-4">
      <v-btn rounded
             v-for="(item,i) in items"
             :key="i"
             class="mx-2"
             color="teal darken-1"
             dark
             :href="item.href">{{item.text}}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "傳送", href: "" },
      { text: "退件", href: "" },
      { text: "批覆更正", href: "" },
      { text: "人工結案", href: "" },
      { text: "列印", href: "" },
      { text: "離開", href: "" }
    ]
  })
};
</script>