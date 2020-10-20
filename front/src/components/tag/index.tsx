import { createApp, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'n-tag',

  props: {
    type: {
      type: String,
      default: 'light'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  setup(props, ctx) {
    const { type, iconClass } = props

    return () => (
      <span class={`n-tag n-tag--${type} n-pad-icon`}>
        <i class={`n-icon-${iconClass || type}`}></i>
        <span>{ctx.slots.default()}</span>
      </span>
    )
  },
})