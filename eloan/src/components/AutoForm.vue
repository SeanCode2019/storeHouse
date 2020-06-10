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
              :suffix="GetProp('suffix',item, propertyName)"
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
                <myTextField :item="item" :propName="propertyName"></myTextField> 
              </v-col>
            </v-row>
            <!-- address -->
            <template v-else-if="'address' === DecideType(item)">
              <myAddress :item="item" :propName="propertyName"></myAddress>
            </template>
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
import myTextField from "./MyTextField"
import myAddress from "./Address"

export default {
  props: ["data"],
  name: "AutoForm",
  data: () => ({}),
  components: {
    myTextField,
    myAddress
  },
  methods: {
    DecideType,
    DecideCol,
    GetTextFieldProp,
    GetSuffix,
    GetProp
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

//return property value
// _prop = vuetify html property
// _item = current data item
// _propName = current item's name
function GetProp(_prop, _item, _propName) {
  let hasProp = _item.props[_prop] != undefined
  let falseReturn = _prop === 'readonly' || _prop === 'filled' ? undefined : '' 
  return hasProp ? _item.props[_prop][_propName] : falseReturn
}

function GetSuffix(_item, _propName) {
  let hasSuffix = _item.props.suffix != undefined
  return hasSuffix ? _item.props.suffix[_propName] : ''
}
</script>