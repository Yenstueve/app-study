<template>
<div class="cart-list">
    <scroll class="content" ref="scroll">
        <cartlist-item  v-for="(item ,index) in CartList" 
                    :key="index" 
                    :item-info="item" ></cartlist-item>
    </scroll>
</div>
</template>

<script>
import Scroll from '../../../components/common/scroll/scroll'
import CartlistItem from './CartlistItem.vue'

import{mapGetters} from 'vuex'


export default {
    name:'CartList',
   
    components:{
        Scroll,
        CartlistItem,
    },
    computed:{
       ...mapGetters(['CartList'])
    },
//因为每次添加一件商品到购物车，better-scroll都不知道添加了商品，所以高度是scrollHtml=0，
//所以要每次添加完商品之后做一次refresh,告诉better-scroll 我们添加了商品
// 要在actived()中进行刷新，因为组件的生命周期中，是有缓存的，所以不能在create和mouted中进行刷新
    activated(){ 
     //  console.log('hhhhh')  ,接着就是要拿到组件scroll, 组件就用ref引用拿取
     this.$refs.scroll.refresh()
    },
}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>