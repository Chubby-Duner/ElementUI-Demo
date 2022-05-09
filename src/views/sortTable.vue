<template>
    <el-table
      :data="tableData"
      ref="sortTable"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
</template>

<script>
import Sortable from 'sortablejs'

export default {
    data() {
        return {
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            }],
            sortTable: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setSort();
        });
    },
    methods: {
        setSort() {
            const el = this.$refs.sortTable.$el.querySelectorAll(
                '.el-table__body-wrapper > table > tbody'
            )[0];
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                setData: function(dataTransfer) {
                    // to avoid Firefox bug
                    // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                    dataTransfer.setData('Text', '');
                },
                // 元素被选中
                onChoose: function (/**Event*/evt) {
                    evt.oldIndex;  // element index within parent
                    console.log(evt.oldIndex, 'choose');
                },
                // 开始拖拽的时候
                onStart: function (/**Event*/evt) {
                    evt.oldIndex;  // element index within parent
                    console.log(evt.oldIndex, 'start');
                },
                onEnd: evt => {
                    console.log(evt, 'evt');
                }
            });
        }
    }
}
</script>