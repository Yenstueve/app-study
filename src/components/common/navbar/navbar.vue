<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center">购物车</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-bar{
  display: flex;
  line-height: 44px;
  width: 100%;

  text-align:center;
  box-shadow: 0px 1px 1px rosybrown;
}
.left, .right{
width: 60px;
}
.center{
  flex:1;
  text-align: center;
}

</style>