<template>
  <div class="GoodsList">
   <!-- {{goods}} -->
    <!--v-for是遍历渲染goods，即goodslist组件内的数据，
    绑定 :goodsitem = "item" 是将item传给子组件goodsitem中，让子组件可以得到item数据 -->
   <goods-list-item v-for="item in goods" :key="item.id" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
      name:'GoodsList',
      //让父组件可以用
      props:{
          goods:{
            type:Array,
            default(){
               return []
            }
          }
      },
  components: {
     GoodsListItem 
     },



}
</script>

<style scoped>
  .GoodsList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>