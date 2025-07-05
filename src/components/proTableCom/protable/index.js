import ProTable from './src/index.vue';

ProTable.install = function (Vue) {
  Vue.component(ProTable.name, ProTable);
};

export const ProTableCom = ProTable;

export default ProTableCom;
