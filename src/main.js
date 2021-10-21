import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VCharts from 'v-charts';

// 引入Vue i18n
import i18n from './i18n/i18n'

Vue.use(VCharts);



// 引入tainwind css
// import "tailwindcss/tailwind.css"
import "./index.css"

import {
  checkArray
} from './common/js/array'

Vue.use(ElementUI);

import {
  DatePicker
} from 'element-ui'

Vue.use(DatePicker);

// 引入mock.js
require('./mock')

Vue.config.productionTip = false;

/* 
  我们通常给一个元素添加 v-if / v-show 来做权限管理，但如果判断条件繁琐且多个地方需要判断，这种方式的代码不仅不优雅而且冗余。

  针对这种情况，我们可以通过全局自定义指令来处理：我们先在新建个 array.js 文件，用于存放与权限相关的全局函数；
*/

// 自定义指令directive

Vue.directive("permission", {
  inserted(el, binding) {

    // el ==> dom元素
     
    /* binding 对象

        {name: "permission", rawName: "v-permission", value: "1", expression: "'1'", modifiers: {…}, …}
          {
            def: {inserted: ƒ}
            expression: "'1'"
            modifiers: {}
            name: "permission"
            rawName: "v-permission"
            value: "1"
            __proto__: Object
         }
    */

    let permission = binding.value; // 获取到 v-permission的值

    if (permission) {
      let hasPermission = checkArray(permission);
      if (!hasPermission) { // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')