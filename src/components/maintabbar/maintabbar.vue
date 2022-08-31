<template>
  <div id="app">

<tabbar>
  <tabbarItem path="/home" activeColor="green"> 
    <img slot="item-icon" src="../../assets/img/home.png" alt="">
    <img slot="item-icon-active" src="../../assets/img/homed.png" alt="">
    <div slot="item-text">首页</div>
  </tabbarItem>
<tabbarItem path="/shop" activeColor="orange"> 
    <img slot="item-icon" src="../../assets/img/shopping.png" alt="">
    <img slot="item-icon-active" src="../../assets/img/shopped.png" alt="">
    <div slot="item-text">购物车</div>
  </tabbaritem>
<tabbarItem path="/share" activeColor="green"> 
    <img slot="item-icon" src="../../assets/img/share.png" alt="">
    <img slot="item-icon-active" src="../../assets/img/shopped.png" alt="">
    <div slot="item-text">分享</div>
  </tabbarItem>
  <tabbarItem path="/mine" activeColor="green"> 
    <img slot="item-icon" src="../../assets/img/mine.png" alt="">
    <img slot="item-icon-active" src="../../assets/img/mined.png" alt="">
    <div slot="item-text">我的</div>
  </tabbarItem>
</tabbar>

</div>
</template>

<script>
import Tabbar from '../common/tabbar/tabbar.vue'
import TabbarItem from '../common/tabbarItem/tabbarItem.vue'


export default {
  components: {
    TabbarItem, 
    Tabbar
       },

}
</script>

<style scoped>

</style>