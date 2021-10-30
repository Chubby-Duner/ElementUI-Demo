<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div class="block">
      <span class="demonstration">日期选择:</span>
      <el-date-picker
        v-model="dateStr"
        type="daterange"
        align="right"
        unlink-panels
        @change="getTime"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>

    <button @click="sentNum">发送</button>
    <button @click="changePid">改变pis为我是子组件</button>

    <input type="text" v-focus="isFocus" @input="iptHandle" />

    <button @click="saveStorage">存储Storage</button>

    <hr />
    <div class="btns">
      <button v-permission="'1'">权限按钮1</button>
      <!-- 会显示 -->
      <button v-permission="'10'">权限按钮2</button>
      <!-- 无显示 -->
      <button v-permission="'demo'">权限按钮3</button>
      <!-- 会显示 -->
    </div>

    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left; margin-right: 20px">{{ item.value }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.sku
        }}</span>
      </el-option>
    </el-select>

    <ul>
      <li
        v-for="(val, key, index) in obj"
        :key="index"
        :class="'item-' + index"
      >
        {{ key }}:{{ val }}:{{ index }}
      </li>
    </ul>
    <!-- <div v-if="obj?.monday?.host">host</div>  
    
    <div v-if="obj?.monday?.address">address</div> -->

    <el-input
      placeholder="请填写金额"
      clearable
      style="width: 150px"
      size="small"
      class="test"
    >
    </el-input>
    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
    </el-date-picker>
    <br />
    <br />
    <br />
    <br />
    <div v-for="(item, index) in functions" :key="index" class="row">
      <div v-for="(obj, i) in item.functions" :key="i" class="col">
        <div class="label">{{ obj.functionsName }}</div>
        <el-radio-group v-model="form[index][i].selected" v-if="obj.isRadio">
          <el-radio :label="val.key" v-for="(val, j) in obj.operate" :key="j">{{
            val.value
          }}</el-radio>
        </el-radio-group>
        <el-checkbox-group v-model="form[index][i].selected" v-else>
          <el-checkbox
            :label="val.key"
            v-for="(val, j) in obj.operate"
            :key="j"
            >{{ val.value }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </div>
    <el-button @click="submit">提交</el-button>
    <el-button @click="editTest">编辑</el-button>
    <br>
    <br>
    <br>
    <br>
    <div v-for="(item, index) in reason" :key="index">
      <span v-if="item.value !== ''"> {{ item.label }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// 引入utils库的方法
import { setStroage, columns } from "../common/js/utils";

export default {
  name: "Home",
  data() {
    return {
      value1: new Date(),
      dateStr: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              let end = new Date();
              let start = new Date();
              start.setDate(1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "上月",
            onClick(picker) {
              let oDate = new Date();
              let year = oDate.getFullYear();
              let month = oDate.getMonth();
              let start, end;
              if (month == 0) {
                year--;
                start = new Date(year, 11, 1);
                end = new Date(year, 11, 31);
              } else {
                start = new Date(year, month - 1, 1);
                end = new Date(year, month, 0);
              }

              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      startDateStr: "",
      endDateStr: "",
      pid: 10086,
      isFocus: false,
      cities: [
        {
          key: "123654eee5",
          value: "北京",
          name: "bj",
          sku: "beijing",
        },
        {
          key: "123677777545",
          value:
            "需要对普通 DOM 元素进行底层操作:A0001s5a64d5s4a6d45sda48as7a5d4a5s4da65s4da654sd5a46",
          name: "bj1",
          sku: "A0001s5a64d5s4a6d45sda48as7a5d4a5s4da65s4da654sd5a46",
        },
        {
          key: "123888886545",
          value: "这时候就会用到自定义指令阿萨大师阿达萨达啊撒阿萨啊",
          name: "bj2",
          sku: "beijing2",
        },
        {
          key: "1236545",
          value: "A0001:Test",
          name: "Test",
          sku: "A0001s5a64d5s4a6d45sda48as7a5d4a5s4da65s4da654sd5a46",
        },
      ],
      value: "",
      obj: {
        name: "小明",
        age: 19,
        address: "深圳",
        monday: {
          location: "National Mall",
          budget: 200,
          host: null,
          address: "",
        },
      },
      functions: [
        {
          groupName: "仓库商品",
          functions: [
            {
              operate: [
                {
                  value: "禁止",
                  key: 0,
                },
                {
                  value: "个人",
                  key: 1,
                },
                {
                  value: "全部",
                  key: 2,
                },
              ],
              functions: "stockView",
              functionsName: "查看范围",
              isRadio: 1,
            },
            {
              operate: [
                {
                  value: "增加",
                  key: 1,
                },
                {
                  value: "删除",
                  key: 2,
                },
              ],
              functions: "stockAddDel",
              functionsName: "增删操作",
              isRadio: 0,
            },
            {
              operate: [
                {
                  value: "禁止",
                  key: 0,
                },
                {
                  value: "个人",
                  key: 1,
                },
                {
                  value: "全部",
                  key: 2,
                },
              ],
              functions: "stockEdit",
              functionsName: "修改操作",
              isRadio: 1,
            },
            {
              operate: [
                {
                  value: "全部",
                  key: 0,
                },
                {
                  value: "Amazon仓",
                  key: 1,
                },
                {
                  value: "Wish仓",
                  key: 2,
                },
              ],
              functions: "operateDepot",
              functionsName: "仓库权限",
              isRadio: 1,
            },
            {
              operate: [
                {
                  value: "禁止",
                  key: 0,
                },
                {
                  value: "个人",
                  key: 1,
                },
                {
                  value: "全部",
                  key: 2,
                },
              ],
              functions: "stockSupplier",
              functionsName: "查看供应商",
              isRadio: 1,
            },
          ],
          groupKey: "stock",
        },
      ],
      form: [],
      authorities: [
        {
          id: "1438054789895393280",
          functions: "stockEdit",
          isRadio: true,
          selected: 0,
          roleId: 1,
        },
        {
          id: "1438054789903781888",
          functions: "stockEdit",
          isRadio: false,
          selected: 0,
          roleId: 1,
        },
        {
          id: "1438054789907976192",
          functions: "stockSupplier",
          isRadio: true,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054789920559104",
          functions: "stockView",
          isRadio: true,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054789928947712",
          functions: "joomProductView",
          isRadio: true,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054789937336320",
          functions: "joomProductEdit",
          isRadio: true,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790105108480",
          functions: "purchaseProduct",
          isRadio: true,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790113497088",
          functions: "orderView",
          isRadio: true,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790117691392",
          functions: "orderView",
          isRadio: false,
          selected: 3,
          roleId: 1,
        },
        {
          id: "1438054790126080000",
          functions: "orderView",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790130274304",
          functions: "orderView",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790138662912",
          functions: "overseasWarehouseOrder",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790142857216",
          functions: "global",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790151245824",
          functions: "stockAddDel",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790155440128",
          functions: "stockAddDel",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790163828736",
          functions: "aliexpressShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790168023040",
          functions: "aliexpressShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790172217344",
          functions: "amazonShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790180605952",
          functions: "amazonShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790205771776",
          functions: "joomShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790214160384",
          functions: "joomShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790218354688",
          functions: "lazadaShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790226743296",
          functions: "lazadaShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790230937600",
          functions: "mallShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790239326208",
          functions: "mallShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790243520512",
          functions: "shopeeShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790369349632",
          functions: "shopeeShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790377738240",
          functions: "wishShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790398709760",
          functions: "wishShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790407098368",
          functions: "mercadoShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790411292672",
          functions: "mercadoShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
        {
          id: "1438054790415486976",
          functions: "kauflandShop",
          isRadio: false,
          selected: 1,
          roleId: 1,
        },
        {
          id: "1438054790423875584",
          functions: "kauflandShop",
          isRadio: false,
          selected: 2,
          roleId: 1,
        },
      ],
      reason: [
        {
          value: '',
          label: '全部'
        }, 
        {
          value: 'success',
          label: '成功'
        },
        {
          value: 'error',
          label: '失败'
        }
      ],
    };
  },
  directives: {
    //自定义指令
    // 需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令 
    // 
    // 当页面加载时，该元素将获得焦点 (注意：autofocus 在移动版 Safari 上不工作)。
    // 事实上，只要你在打开这个页面后还没点击过任何内容，这个输入框就应当还是处于聚焦状态。  inserted  当被绑定的元素插入到 DOM 中时……
    focus: {
      update: function (el, { value }) {
        if (value) {
          el.focus();
        } else {
          el.blur();
        }
      }
    },
  },
  created() {
    console.log('created');
    const that = this;
    // 测试 pormise
    return new Promise(() => {
      console.log('this ==> ', this);
      console.log('that ==> ', that);
    })
  },
  mounted() {
    console.log(this.obj?.monday?.host);
    console.log(this.obj?.monday?.address);
    console.log(columns);


    let form = [];
    this.functions.forEach((item) => {
      let arr = [];
      item.functions.forEach((obj) => {
        arr.push({
          functions: obj.functions,
          selected: obj.isRadio ? 0 : [], // 单选默认选中第一个  
          isRadio: obj.isRadio,
        });
      });
      form.push(arr);
    });
    this.form = form;
    console.log(form, "初始化");
    console.log(this.form, "初始化");
  },
  methods: {
    submit() {
      let form = [];
      this.form.forEach((item) => {
        item.forEach((obj) => {
          if (obj.selected !== "" && obj.selected.length !== 0 && obj.selected !== undefined) {
            if (obj.isRadio) {
              form.push({
                functions: obj.functions,
                selected: obj.selected,
                isRadio: obj.isRadio,
              });
            } else {
              obj.selected.forEach((val) => {
                form.push({
                  functions: obj.functions,
                  isRadio: obj.isRadio,
                  selected: val,
                });
              });
            }
          }
        });
      });
      console.log(form, "提交");
      console.log(this.form, "this.form");
    },
    edit() {
      let form = [];
      this.functions.forEach((item) => {
        let arr = [];
        item.functions.forEach((obj) => {
          arr.push({
            functions: obj.functions,
            selected: this.returnSelected(obj.functions, obj.isRadio),
            isRadio: obj.isRadio,
          });
        });
        form.push(arr);
      });
      this.form = form;
      // console.log(form, "arr编辑");
    },
    returnSelected(functions, isRadio) {
      let data = [
        { functions: "stockView", isRadio: true, selected: 1 },
        { functions: "stockAddDel", isRadio: false, selected: 1 },
        { functions: "stockAddDel", isRadio: false, selected: 2 },
        { functions: "stockEdit", isRadio: true, selected: 1 },
        { functions: "operateDepot", isRadio: true, selected: 1 },
        { functions: "stockSupplier", isRadio: true, selected: 1 },
      ];
      let arr = this.groupArr(data, "functions");
      let selected = isRadio ? "" : [];
      arr.forEach((item) => {
        // console.log(item.type === functions);
        if (item.type === functions) {
          if (isRadio) {
            selected = item.list[0].selected;
          } else {
            let arr = [];
            item.list.forEach((obj) => {
              arr.push(obj.selected);
            });
            selected = arr;
          }
        }
      });
      return selected;
    },
    groupArr(list, field) {
      console.log(list, "list");
      var fieldList = [],
        att = [];
      list.map((e) => {
        fieldList.push(e[field]);
      });
      //数组去重
      fieldList = fieldList.filter((e, i, self) => {
        return self.indexOf(e) == i;
      });
      console.log(fieldList, "fieldList");
      for (var j = 0; j < fieldList.length; j++) {
        //过滤出匹配到的数据
        var arr = list.filter((e) => {
          return e.functions == fieldList[j];
        });
        att.push({
          type: arr[0].functions,
          list: arr,
        });
      }
      console.log(att, "att");
      return att;
    },
    groupBy(arr, fn) {
      return arr
        .map(typeof fn === "function" ? fn : (val) => val[fn])
        .reduce((acc, val, i) => {
          acc[val] = (acc[val] || []).concat(arr[i]);
          return acc;
        }, {});
    },
    getTime() {
      console.log("------格式前--------");
      console.log(this.dateStr);

      // 调用格式化方法
      this.startDateStr = this.formatDate(this.dateStr[0]);
      this.endDateStr = this.formatDate(this.dateStr[1]);

      console.log("------格式后--------");
      console.log(this.startDateStr, this.endDateStr);
    },

    // 转换日期格式 
    formatDate(dateTime) {
      let date = new Date(dateTime);
      let YY = date.getFullYear() + "-";
      let MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },

    sentNum() {
      this.$emit("getNum", this.pid);
    },

    changePid() {
      this.pid = "我是子组件";
      console.log(this.pid);
    },
    iptHandle() {
      this.focus = true;
      console.log(this.focus);
    },
    saveStorage() {
      console.log(1);
      setStroage("test", "abcd");
      console.log(2);
    },
    components: {},
  },
}
</script>

<style>
.test .el-input__inner {
  background: #002e3a;
  box-shadow: 0px 0px 10px 5px #005161 inset;
}

.row {
  padding: 30px;
  /* width: 100%; */
  /* height: 100vh; */
}
</style>