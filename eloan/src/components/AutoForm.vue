<template>
  <v-row>
    <template v-for="(item,i) in data">
      <v-col :cols="item.cols"
             :key="i">
        <v-row>
          <template v-for="sub in item.items">
            <v-col :cols="sub.cols"
                   :key="sub.ID">
              <v-subheader v-if="sub.content.type==='label'">{{sub.content.label}}</v-subheader>
              <v-text-field v-else-if="sub.content.type==='input'"
                            v-model="sub.content.value"
                            :prefix="sub.content.prefix"
                            :suffix="sub.content.suffix"></v-text-field>
              <v-radio-group v-else-if="sub.content.type==='checkbox'"
                             v-model="sub.content.value"
                             row>
                <v-radio v-for="third in sub.content.selects"
                         :label="third"
                         :value="third"
                         :key="third"></v-radio>
              </v-radio-group>
              <v-select v-else-if="sub.content.type==='select'"
                        :items="sub.content.selects"
                        :label="'請選擇'"
                        v-model="sub.content.value"
                        solo></v-select>
            </v-col>
          </template>
        </v-row>
      </v-col>

    </template>
  </v-row>
</template>
<script>
export default {
  name: "autoForm",
  props: ["data"]
};
</script>