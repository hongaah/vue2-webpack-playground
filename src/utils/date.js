function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function getRegularTime (timestamp = new Date().getTime()) {
  const now = new Date().getTime()
  const nowDate = new Date(now)
  const pastDate = new Date(timestamp)
  const interpolation = now - timestamp
  const hourMs = 60 * 60 * 1000
  const dayMs = 24 * hourMs
  const yearMs = 365 * dayMs
  const nowDay = nowDate.getDate()
  const nowHour = nowDate.getHours()
  const nowMinute = nowDate.getMinutes()
  const pastDay = pastDate.getDate()
  const pastHour = pastDate.getHours()
  const pastMinute = pastDate.getMinutes()

  if (interpolation < hourMs) {
    // 1小时内
    return `${nowMinute - pastMinute} 分钟前`
  } else if (interpolation < dayMs) {
    // 24小时内
    if (nowDay === pastDay) {
      return `${nowHour - pastHour} 小时前`
    } else {
      return `${24 - pastHour + nowHour} 小时前`
    }
  } else if (interpolation < yearMs) {
    // 1年内
    return formatTime(timestamp).slice(5)
  } else {
    // 1年以后
    return formatTime(timestamp)
  }
}

export {
  formatTime,
  getRegularTime
}
