import Vue from 'vue'

import {
  Button,
  Message,
  Notification
} from 'ant-design-vue'

Vue.use(Button)

Vue.prototype.$message = Message
Vue.prototype.$notification = Notification
