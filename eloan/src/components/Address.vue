<template>
  <v-row>
    <!-- postal code -->
    <v-col cols="1">
      <v-text-field
        v-model="item.content.value.postalCode.content.value"
        :readonly="true"
        :filled="true"
      ></v-text-field>
    </v-col>
    <!-- city -->
    <v-col cols="1">
      <v-select
        :items="item.content.value.city.selects"
        v-model="item.content.value.city.value"
        solo
      ></v-select>
    </v-col>
    <!-- region -->
    <v-col cols="1">
      <v-select
        :items="item.content.value.region.selects"
        v-model="item.content.value.region.value"
        solo
      ></v-select>
    </v-col>
    <!-- village -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.village"></v-text-field>
    </v-col>
    <!-- village type -->
    <v-col cols="1">
      <v-select
        :items="item.content.value.villageType.selects"
        v-model="item.content.value.villageType.value"
        solo
      ></v-select>
    </v-col>
    <!-- neightbrohood -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.neightbrohoood" suffix="鄰"></v-text-field>
    </v-col>
    <!-- road -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.road"></v-text-field>
    </v-col>
    <!-- road type -->
    <v-col cols="1">
      <v-select
        :items="item.content.value.roadType.selects"
        v-model="item.content.value.roadType.value"
        solo
      ></v-select>
    </v-col>
    <!-- section -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.section" suffix="段"></v-text-field>
    </v-col>
    <!-- lane -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.lane" suffix="巷"></v-text-field>
    </v-col>
    <!-- alley -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.alley" suffix="弄"></v-text-field>
    </v-col>
    <!-- number -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.number" suffix="號">
        <span slot="append-outer">之</span>
      </v-text-field>
    </v-col>
    <!-- sunNumber -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.subNumber"></v-text-field>
    </v-col>
    <!-- floor -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.floor" suffix="樓">
        <span slot="append-outer">之</span>
      </v-text-field>
    </v-col>
    <!-- subFloor -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.subFloor"></v-text-field>
    </v-col>
    <!-- room -->
    <v-col cols="1">
      <v-text-field v-model="item.content.value.room" suffix="室"></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MyTextField",
  props: ["item", "propName"],
  data: () => ({}),
};
</script>
