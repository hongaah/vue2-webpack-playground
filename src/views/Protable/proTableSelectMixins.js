import { Message } from 'element-ui'
import * as lodashEs from 'lodash-es'

export default {
  data() {
    return {
      selected: []
    }
  },
  methods: {
    onSelectionChange(val) {
      console.log('onSelectionChange', val)
      this.selected = val
    },
    selectWhenClickingLine(row) {
      this.$refs.proTableRef.table.toggleRowSelection(row)
    },
    selectOnlyThisLine(row) {
      this.$refs.proTableRef.table.clearSelection()
      this.$refs.proTableRef.table.toggleRowSelection(row)
    },
    validChooseAtLeastOne() {
      try {
        if (!this.selected) {
          throw Error('请至少选择一条记录')
        }
        if (Array.isArray(this.selected) && !this.selected.length) {
          throw Error('请至少选择一条记录')
        }
        if (lodashEs.isPlainObject(this.selected) && !Object.keys(this.selected).length) {
          throw Error('请至少选择一条记录')
        }
      } catch (err) {
        Message.info(err.message)
        return false
      }

      return true
    },
    validChooseOne() {
      try {
        if (!this.selected) {
          throw Error('请选中一条记录')
        }
        if (Array.isArray(this.selected) && this.selected.length !== 1) {
          throw Error('请选中一条记录')
        }
        if (lodashEs.isPlainObject(this.selected) && !Object.keys(this.selected.value).length) {
          throw Error('请选中一条记录')
        }
      } catch (err) {
        Message.info(err.message)
        return false
      }
      return true
    }
  }
}
