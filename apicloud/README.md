# apicloud

> 需付费的可视化低代码开发运营平台

## 实践 h5 项目转 APP

### 准备工作

- [手机安装 Apploader](https://docs.apicloud.com/Download/download)，支持 Android & iOS
- [电脑安装编辑器 APICloud Studio 3](https://www.apicloud.com/studio3)，安装好以上两个软件后可用于APP开发过程的真机快速调试
- 在[apicloud](https://www.apicloud.com/portal-web/console)创建账号

### 使用

在编辑器登录账号，新建 Native App 项目后即可同步到云控制台，项目中只保留项目中`config.xml`文件

```xml:config.xml 节选部分，关键看以下配置
  <widget id="A6116853009399"  version="0.0.1"> // 需要跟云项目中id一致
  <content src="./dist/index.html" /> // 链接对入口文件，可以是局域网ip或编译好的项目文件入口
```

### 真机调试

以vue-cli4项目为例，打包前需修改以下地方：

- 路由配置为 `hash` 模式
- 配置 vue.config.js 文件： `publicPath: './'`
- [多页面配置](https://juejin.cn/post/6844903858498437127#heading-0)

wifi同步：链接项目入口后，右键项目根路径打开WIFI同步

## 教程

- 官方教程：<https://www.apicloud.com/video_list#plugins>
- 图文教程：<https://juejin.cn/post/6973441944374476831#heading-0>

