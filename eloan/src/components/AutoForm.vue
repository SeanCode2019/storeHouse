<template>
  <v-row class="pr-5">
    <template v-for="(item, index) in data">
      <v-col :class="item.mainPart.class" :md="item.mainPart.cols.md" :lg="item.mainPart.cols.lg" :xl="item.mainPart.cols.xl" :cols="item.mainPart.cols.sm" :key="index" >
        <v-row >
          <v-col :cols="item.label.cols.col" :md="item.label.cols.md">
            <v-subheader>{{item.label.text}}</v-subheader>
          </v-col>
          <v-col v-for="(subItem, subIndex) in item.items" :key="subIndex" :cols="subItem.cols.col"  :md="subItem.cols.md" :lg="subItem.lg" :offset="subItem.offset" :offset-md="subItem.offsetMd">
            <v-text-field
              v-if="subItem.type === 'input'"
              v-model="subItem.value"
              :prefix="subItem.prefix"
              :suffix="subItem.suffix"
              :placeholder ="subItem.placeholder"
              :filled="subItem.filled"
              :readonly="subItem.readonly"
            ></v-text-field>
            <v-radio-group v-else-if="subItem.type ==='checkbox'" v-model="subItem.value" row>
              <v-radio
                v-for="option in subItem.selects"
                :label="option.key"
                :value="option.value"
                :key="option.key"
              ></v-radio>
            </v-radio-group>
            <v-select
              v-else-if="subItem.type ==='select'"
              :items="subItem.selects"
              :label="'請選擇'"
              v-model="subItem.value"
              solo
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </template>
  </v-row>
</template>
<script>
export default {
  name: "autoForm",
  props: ["data"],
  methods: {
    // GetProp
  }
};

// function GetProp(_condition, _subItem) {
//   return _subItem[_condition]
// }
</script>