<template>
  <div class="Cart">
    <!--1、导航-->
      <navbar class="nav-bar">
          <div slot="center">购物车({{length}})</div>
      </navbar>

    <!--2、商品列表-->
      <cart-list />

    <!--3、底部汇总-->
<cart-bottm-bar />
  </div>
</template>

<script>
import navbar from '../../components/common/navbar/navbar'
import CartList from './CartChild/CartList.vue'
import CartBottmBar from './CartChild/CartBottmBar.vue'


//这是vuex提供的方法 mapGetters
import { mapGetters } from 'vuex'

export default {
    name:'Cart',
  components: { 
    navbar,
    CartList,
    CartBottmBar,
     },
     computed:{
       //方法一：
       //CartLength(){
        //   return this.$store.getters.CartLength  }
        //mapGetters 方法的写法一
        ...mapGetters({
          length:'CartLength',
          list:'CartList',
        })
      //写法二：
    //  ...mapGetters(['CartLength','CartList'])
     },

}
</script>

<style scoped>
.Cart{
  height: 100vh;
}
.nav-bar{
    background-color: deeppink;
    color: white;
    font-weight: 700;
}
</style>