<template>
  <v-text-field
    v-model="item.content.value[propName]"
    :readonly="GetProp('readonly',item, propName)"
    :filled="GetProp('filled',item, propName)"
    :suffix="GetProp('suffix', item, propName)"
    :placeholder="GetProp('placeholder',item, propName)"
    :prefix="GetProp('prefix',item, propName)"
  ></v-text-field>
</template>

<script>
export default {
  name: "MyTextField",
  props:["item","propName"],
  data: () => ({}),
  methods:{
    GetProp
  }
};

//return property value
// _prop = vuetify html property
// _item = current data item
// _propName = current item's name
function GetProp(_prop, _item, _propName) {
  let hasProp = _item.props[_prop] != undefined
  let falseReturn = _prop === 'readonly' || _prop === 'filled' ? undefined : '' 
  return hasProp ? _item.props[_prop][_propName] : falseReturn
}
</script>
