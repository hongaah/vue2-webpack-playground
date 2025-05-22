<template>
  <div class="srm-switch-wrap">
    <div
      :class="['srm-switch', { 'srm-switch-checked': checkedVal, disabled: disabled }]"
      @click="disabled ? (e) => e.preventDefault() : onSwitch()"
    >
      <div :class="['srm-switch-inner', checkedVal ? 'inner-checked' : 'inner-unchecked']">
        {{ checkedVal ? checkedInfo : uncheckedInfo }}
      </div>
      <div :class="['u-node', { 'node-checked': checkedVal }]"></div>
    </div>
  </div>
</template>
<script>
  import '../style/switch.scss'

  export default {
    name: 'SrmSwitch',
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      defaultChecked: {
        // 初始是否选中
        type: Boolean,
        default: false
      },
      checkedInfo: {
        // 选中时的内容
        type: [Number, String],
        default: null
      },
      uncheckedInfo: {
        // 未选中时的内容
        type: [Number, String],
        default: null
      },
      disabled: {
        // 是否禁用
        type: Boolean,
        default: false
      },
      checked: {
        // （v-model）指定当前是否选中
        type: Boolean,
        default: null
      }
    },
    data() {
      return {
        checkedVal: null
      }
    },
    watch: {
      checked() {
        this.initSwitcher()
      },
      defaultChecked() {
        this.initSwitcher()
      }
    },
    created() {
      this.initSwitcher()
    },
    methods: {
      initSwitcher() {
        if (typeof this.checked === 'boolean') {
          this.checkedVal = this.checked
        } else if (typeof this.checked === 'object') {
          this.checkedVal = this.defaultChecked
        }
      },
      onSwitch() {
        this.checkedVal = !this.checkedVal
        this.$emit('change', this.checkedVal)
      }
    }
  }
</script>
