export default {
  data() {
    return {
      columnsSetData: null,
      columnsKey: 0
    }
  },
  methods: {
    updateColumns(newColumns) {
      this.columnsKey = this.columnsKey + 1
      this.columnsSetData = newColumns
    }
  },
  mounted() {
    if (this.customId && this.$refs.ListConfigRef) {
      this.$refs.ListConfigRef.init()
    }
  }
}
