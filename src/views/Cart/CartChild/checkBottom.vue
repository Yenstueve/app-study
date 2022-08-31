<template>
<!--通常进行点击后才换颜色或者改变简单状态，都是进行动态绑定 :class{check:isChecked},然后再进行.check样式编辑-->
  <div class="checkBottom" :class="{check:isChecked}">
<img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name:'checkBottom',
    props:{
        isChecked:{
            type:Boolean,
            default: true,
        }
    },

}
</script>

<style scoped>
.checkBottom{
    border-radius: 50%;
    border: 2px solid #aaa;
}
.check{
    border-color: red;
    background-color: red;
}
</style>