<template>
<div id="App">
  <keep-alive exclude="detail">
  <router-view/>
  </keep-alive>
  <maintabbar/>
</div>
</template>


<script>
import Maintabbar from './components/maintabbar/maintabbar.vue'


 export default {
   name:'App',
  components: {
    Maintabbar,
  }
 }
</script>

<style lang="less" scoped>
  @import url('./assets/css/base');

</style>