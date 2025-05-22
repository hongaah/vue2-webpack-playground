import Page from './src/index.vue';

Page.install = function (Vue) {
  Vue.component(Page.name, Page);
};

export const PageCom = Page;

export default PageCom;
