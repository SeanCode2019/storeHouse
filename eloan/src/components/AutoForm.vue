<template>
  <v-row>
    <template v-for="(item, propertyName) in data">
      <v-col :cols="DecideCol('mainPart', item)" :key="propertyName" v-if="CheckShow(item)">
        <v-row>
          <v-col :cols="DecideCol('subHeader', item)">
            <v-subheader>{{item.content.title}}</v-subheader>
          </v-col>
          <v-col :cols="DecideCol('content', item)">
            <!-- input -->
            <v-text-field
              v-if="'input' === DecideType(item)"
              v-model="item.content.value"
              :readonly="GetTextFieldProp('readonly', item, propertyName)"
              :filled="GetTextFieldProp('filled', item, propertyName)"
              :suffix="GetSuffix(item, propertyName)"
            ></v-text-field>
            <!-- checkbox -->
            <v-radio-group
              v-else-if="'checkbox'=== DecideType(item)"
              v-model="item.content.value"
              row
            >
              <v-radio
                v-for="subItem in item.content.selects"
                :label="subItem"
                :value="subItem"
                :key="subItem"
              ></v-radio>
            </v-radio-group>
            <!-- multiple input -->
            <v-row v-else-if="'multipleInput' === DecideType(item)">
              <v-col
                cols="6"
                v-for="(value, propertyName) in item.content.value"
                :key="propertyName"
              >
                <v-text-field
                  v-model="item.content.value[propertyName]"
                  :readonly="GetTextFieldProp('readonly',item, propertyName)"
                  :filled="GetTextFieldProp('filled',item, propertyName)"
                  :suffix="GetSuffix(item, propertyName)"
                  :placeholder="GetTextFieldProp('placeholder',item, propertyName)"
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- address -->
            <v-row v-else-if="'address' === DecideType(item)">
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
            <!-- select -->
            <v-select
              v-else
              :items="item.content.selects"
              :label="'請選擇'"
              v-model="item.content.value"
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
  props: ["data"],
  name: "AutoForm",
  data: () => ({}),
  components: {},
  methods: {
    DecideType,
    DecideCol,
    GetTextFieldProp,
    GetSuffix
  },
  computed: {
    CheckShow
  }
};

//決定col的大小
function DecideCol(_type, _item) {
  let hasColProps = _item.props.col != undefined;
  let colProps = hasColProps ? _item.props.col : "";
  switch (_type) {
    case "mainPart":
      return hasColProps ? colProps.mainPart : 3;
    case "subHeader":
      return hasColProps ? colProps.subHeader : 4;
    case "content":
      return hasColProps ? colProps.content : 8;
    default:
  }
}

function CheckShow() {
  return function(_item) {
    if (_item.show != undefined) {
      if (_item.show.value === this.data[_item.show.target].content.value) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
}

function DecideType(item) {
  if (item.type.length != 0) {
    return item.type;
  } else if (item.content.selects.length != 0) {
    return "select";
  } else {
    let type = typeof item.content.value;
    if (type === "string" || type === "number") {
      return "input";
    } else if (type === "array" && item.value.length != 0) {
      return "checkbox";
    } else {
      return "multipleInput";
    }
  }
}

function GetTextFieldProp(_props, _item, _propertyName) {
  if (_item.props.textfield != undefined) {
    return _item.props.textfield[_propertyName].includes(_props);
  }
}

function GetSuffix(_item, _propName) {
  let hasSuffix = _item.props.suffix != undefined
  return hasSuffix ? _item.props.suffix[_propName] : ''
}
</script>