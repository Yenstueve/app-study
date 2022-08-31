<template>
  <div class="bottom-bar">
     <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart" >加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'DetailBttomBar',
       methods:{
         addToCart(){
          // console.log('加入到购物车')  //，在子组件中监听到了，要将商品加入购物车，那么就要将监听到的发送出去、
          this.$emit('addToCart')
         },
       }
 
}
</script>

<style scoped>
.bottom-bar{
    height: 59px;
    background-color: white;
    position: relative;

    display: flex;
    text-align: center;
}
 .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 18px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 3px;
    background: url('.././../../assets/img/detail/detail_bottom.png');
    
  }
  .bar-left .service {
    background-position:0 -54px;
  }
  .bar-left .shop {
    background-position:0 -98px;
  }
  .bar-right {
    font-size: 18px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>