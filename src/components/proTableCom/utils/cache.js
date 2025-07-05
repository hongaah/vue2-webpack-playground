export default {
  getSession: function (name) {
    if (!name) return
    let content = null
    try {
      content = JSON.parse(window.sessionStorage.getItem(name))
    } catch (error) {
      content = window.sessionStorage.getItem(name)
    }
    return content
  },
  setSession: function (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
  },
  removeSession: function (name) {
    if (!name) return
    window.sessionStorage.removeItem(name)
  },
  getLocal: function (name) {
    if (!name) return
    let content = null
    try {
      content = JSON.parse(window.localStorage.getItem(name))
    } catch (error) {
      content = window.localStorage.getItem(name)
    }
    return content
  },
  setLocal: function (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  removeLocal: function (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  /*获取cookie*/
  getCookie: function (name) {
    let arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) return unescape(arr[2])
    else return null
  },
  /*设置cookie*/
  setCookie: function (name, value, time) {
    if (!time) {
      time = '366d'
    }
    let strsec = this.getsec(time)
    let exp = new Date()
    exp.setTime(exp.getTime() + strsec * 1)
    document.cookie =
      name + '=' + escape(value) + ';expires=' + exp.toGMTString() + '; path=/'
  },
  //清除cookie
  clearCookie: function (name) {
    this.setCookie(name, '', -1)
  },
  /*时间*/
  getsec: function (str) {
    if (!isNaN(str)) {
      return str
    } else {
      var str1 = str.substring(1, str.length) * 1
      var str2 = str.substring(0, 1)
      if (str2 == 's') {
        return str1 * 1000
      } else if (str2 == 'h') {
        return str1 * 60 * 60 * 1000
      } else if (str2 == 'd') {
        return str1 * 24 * 60 * 60 * 1000
      } else {
        return str1
      }
    }
  }
}
