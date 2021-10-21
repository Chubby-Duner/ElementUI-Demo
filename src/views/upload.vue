<template>
  <div>
    <el-upload
      ref="upload"
      :auto-upload="false"
      action=""
      :file-list="file"
      :on-change="fileChange"
      accept=".xls,.xlsx"
      size="small"
      style="display: inline-block; margin-top: 10px"
    >
      <el-button size="small" type="primary"
        ><i class="el-icon-upload"></i>选择文件</el-button
      >
    </el-upload>
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
        
        // 请求操作
        const formData = new FormData();
        this.adFileList.forEach((e) => {
          formData.append("file", e.raw);
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

<style>
</style>