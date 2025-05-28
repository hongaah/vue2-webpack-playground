import Vue from 'vue'

Vue.filter('date', (value, formatString) => {
  formatString = formatString || 'MM-dd HH:mm'
  if (!value) return ''
  const [AM, PM] = ['下午 ', '上午 ']
  const DATE_FORMATS_SPLIT = /^(y+)?(\/|\.|-|年)?(M+)?(\/|\.|-|月)?(d+)?(日)?(\s+)?(H+)?(h+)?(\:|时)?(m+)?(\:|分)?(s+)?(秒)?/
  const date = new Date(value)
  const hourDesc = date.getHours()
    ? date.getHours() > 12
      ? AM
      : PM
    : date.getHours()
  let dateFormatter = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear()
      ? date.getFullYear().toString().substring(2)
      : date.getFullYear(),
    MM:
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1,
    M: date.getMonth() + 1,
    dd: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    d: date.getDate(),
    HH: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    H: date.getHours(),
    hh:
      hourDesc +
      (date.getHours() - 12 < 10
        ? '0' + (date.getHours() - 12)
        : date.getHours() - 12),
    h: hourDesc + (date.getHours() - 12),
    mm: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    m: date.getMinutes(),
    ss: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
    s: date.getSeconds()
  }
  let parts = formatString.match(DATE_FORMATS_SPLIT)
  let newParts = parts.slice(1, 15)
  return newParts
    .map((m) => (m ? (dateFormatter[m] ? dateFormatter[m] : m) : ''))
    .join('')
})
