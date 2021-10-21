<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/mock">Mock</router-link> |
      <router-link to="/table">Table</router-link> |
      <router-link to="/limitline">LimitLine</router-link> |
      <router-link to="/tailwind">TailWind</router-link> |
      <router-link to="/table2">Table2</router-link> |
      <router-link to="/normaltable">NormalTable</router-link> |
      <router-link to="/mixin">Mixin</router-link> |
      <router-link to="/form">Form</router-link> |
      <router-link to="/ordersystem">OrderSystem</router-link> |
      <router-link to="/system">System</router-link> |
      <router-link to="/interval1">interval1</router-link> |
      <router-link to="/dynamictable">DynamicTable</router-link> |
      <router-link to="/vuedraggable">VueDraggable</router-link> |
      <router-link to="/vchart">vChart</router-link> |
      <router-link to="/slottest">SlotTest</router-link> |
      <router-link to="/scrollnumber">ScrollNumber</router-link> |
      <router-link to="/eltransfer">ElTransfer</router-link> |
      <router-link to="/i18n">i18n</router-link> |
      <router-link to="/upload">upload</router-link> |
      <router-link to="/editTable">editTable</router-link>
    </div>
    <!-- <Home @getNum="getSonNum">getNum</Home> -->
    <!-- <tabs></tabs> -->
    <!-- <div style="background-color: red; margin-top: 20px">{{ sumHandle }}</div> -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <!-- <prop :str="props"></prop>

    <button @click="asyncClick">点点点</button> -->
  </div>
</template>

<script>
// import Home from "@/views/Home.vue";
// import tabs from "@/views/tabs.vue";
// import prop from "@/components/propsText.vue";

export default {
  data() {
    return {
      parantData: "",
      props: "abcd",
    };
  },
  computed: {
    sumHandle() {
      return `${this.parantData}----拼接666`;
    },
  },
  methods: {
    getSonNum(num) {
      this.parantData = num;
      console.log(this.parantData, typeof this.parantData);
    },
    changeHandle() {
      // this.
    },
    asyncClick() {},
  },
  components: {
    // Home,
    // tabs,
    // prop,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
  position: sticky;
  top: 0;
  z-index: 1;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
