<template>
  <el-input
    v-if="isEditing"
    placeholder="Please input"
    @change="callBack"
    :value="value"
  ></el-input>
  <span v-else>{{ value }}</span>
</template>

<script>
import Vue from "vue";

export default {
  name: "CustomInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    callBack: {
      type: Function,
      required: true,
    },
  },
  computed: {
    name() {
      return this.label.toLowerCase();
    },
  },
};
</script>