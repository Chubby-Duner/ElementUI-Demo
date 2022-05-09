<template>
  <div>
    <el-upload
      ref="upload"
      :auto-upload="false"
      action=""
      :file-list="fileList"
      :on-change="fileChange"
      :on-remove="fileRemove"
      multiple
      accept=".xls,.xlsx"
      size="small"
      style="display: inline-block; margin-top: 10px"
    >
      <el-button size="small" type="primary"
        ><i class="el-icon-upload"></i>选择文件</el-button
      >
    </el-upload>
    <p style="font-weight: bold;">总上传文件数：{{ fileList.length }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    // 检测文件是否有变动
    fileChange(file, fileList) {
      let fileName = file.name.lastIndexOf(".");
      let ext = file.name.substr(fileName + 1);
      if (ext != "xls" && ext != "xlsx") {
        this.$message({
          type: "warning",
          message: `请上传后缀名为xls或xlsx的文件!`,
        });
        this.fileList = [];
      } else {
        let existFile = fileList
          .slice(0, fileList.length - 1)
          .find((f) => f.name === file.name);
        if (existFile) {
          this.$message.error("当前文件已经存在!");
          fileList.pop();
        }
        this.fileList = fileList;
      }
      console.log(file, fileList);
    },
    //检测文件删除
    fileRemove(file, fileList) {
        this.fileList = fileList;
    },
    // 模拟上传请求
    submitUpload() {
       if (this.fileList.length === 0) {
        this.$message({
          type: "warning",
          message: `请选择上传的文件！`,
        });
      } else {
        /* 
          按要求设置接口请求头参数

          headers: { "Content-Type": "multipart/form-data" },
          transformRequest: [
            function (data) {
              return data;
            },
          ],

        */
        console.log(this.adFileList, 'this.this.adFileList');
        // 请求操作
        const formData = new FormData();
        this.adFileList.forEach((e) => {
          formData.append("file", e.raw);  // 文件流
        });
        // api(formData).then(() => {
        //   // ...
        // }).catch(() => {
        //   // .... 
        // })
      }
    }
  },
};
</script>

<style scoped>
/* 多个上传更改el-upload显示文件列表，只展示前5个 */
.el-upload-list .el-upload-list__item:nth-child(n+6) {
    display: none !important;
}
</style>