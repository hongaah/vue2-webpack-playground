export default {
  data() {
    return {
      columnsSetData: null,
      columnsKey: 0
    }
  },
  methods: {
    initListConfig() {
      if (this.customId && this.$refs.ListConfigRef) {
        this.$refs.ListConfigRef.init()
      }
    },
    updateColumns(newColumns) {
      this.columnsKey = this.columnsKey + 1
      this.columnsSetData = newColumns
    }
  },
  mounted() {
    this.initListConfig()
  }
}
