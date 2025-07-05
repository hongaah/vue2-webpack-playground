import { RESERVE_SLOTS } from './index'

export const getEpTableCommonFns = (target) => {
  return {
    clearSelection: target.clearSelection,
    getSelectionRows: target.getSelectionRows,
    toggleRowSelection: target.toggleRowSelection,
    toggleAllSelection: target.toggleAllSelection,
    toggleRowExpansion: target.toggleRowExpansion,
    setCurrentRow: target.setCurrentRow
  }
}

export const getEpTableCommonEvents = (target) => {
  const result = {}
  const commonEvents = [
    'select',
    'select-all',
    'selection-change',
    'row-click',
    'row-dblclick',
    'sort-change',
    'current-change'
  ]
  commonEvents.forEach((key) => {
    if (target[key]) {
      result[key] = target[key]
    }
  })
  return result
}

/**
 * @description 获取filter或table的json配置中的插槽
 * @param {array} target filter或table的json配置
 * @return {array} 插槽名数组
 */
export const getOptionSlots = (target) => {
  const result = target
    .filter((item) => {
      if (item.slot) {
        if (RESERVE_SLOTS.includes(item.slot)) {
          throw new Error(`${item.slot}为组件内部预留插槽，请修改插槽名称`)
        }
        return true
      }
    })
    .map((item) => item.slot)
  return result
}
