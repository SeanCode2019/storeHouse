<template>
  <v-row>
    <template v-for="(item, index) in data">
      <v-col :cols="item.cols" :md="item.md" :lg="item.lg" :xl="item.xl" :key="index" >
        <v-row>
          <v-col :cols="item.labelCols"  :md="item.labelMd">
            <v-subheader>{{item.label}}</v-subheader>
          </v-col>
          <v-col v-for="(subItem, subIndex) in item.items" :key="subIndex" :cols="subItem.cols"  :md="subItem.md" :lg="subItem.lg" :offset="subItem.offset" :offset-md="subItem.offsetMd">
            <v-text-field
              v-if="subItem.type === 'input'"
              v-model="subItem.value"
              :prefix="subItem.prefix"
              :suffix="subItem.suffix"
              :placeholder ="subItem.placeholder"
              :filled="subItem.filled"
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