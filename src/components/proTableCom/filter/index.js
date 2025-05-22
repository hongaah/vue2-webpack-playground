import Filter from './src/index.vue';

Filter.install = function (Vue) {
  Vue.component(Filter.name, Filter);
};

export const FilterCom = Filter;

export default FilterCom;
