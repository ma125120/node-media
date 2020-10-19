<template>
  <span :class="`n-tag n-tag--${type}`">
    <slot></slot>
  </span>
</template>
<script>
import { computed, inject, toRefs, unref, getCurrentInstance } from 'vue'

export default {
  name: 'n-tag',

  props: {
    type: {
      type: String,
      default: 'light'
    },
  },
  emits: ['click'],
  setup(props, ctx) {

  }
}

</script>
