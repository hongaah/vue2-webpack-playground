import Table from './src/index.vue';

Table.install = function (Vue) {
  Vue.component(Table.name, Table);
};

export const TableCom = Table;

export default TableCom;
