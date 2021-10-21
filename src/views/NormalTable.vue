<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
    <el-table-column label="订单状态" width="110" align="center">
      <template slot-scope="{ row }">
        <el-tag :type="row.status | statusFilter">{{
          row.status === 0
            ? "未结单"
            : row.status === 1
            ? "正常结单"
            : row.status === 2
            ? "异常结单"
            : row.status === 3
            ? "废弃"
            : "无状态"
        }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  // 过滤器动态设置状态
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: { type: "success", value: "未结单" },
        1: { type: "info", value: "正常结单" },
        2: { type: "warning", value: "异常结单" },
        3: { type: "danger", value: "废弃" },
      };
      return statusMap[status].type;
      // return map.filter(v=>v.status === status).value
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: 0,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: 1,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          status: 2,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: 3,
        },
      ],
    };
  },
};
</script>

<style>
</style>