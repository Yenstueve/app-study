<template>
    <div id="app">
   <div id="tab-bar">
       <slot> </slot> 
    </div>
    <tabbar-item></tabbar-item>
    </div>
</template>

<script>
import TabbarItem from '../tabbarItem/tabbarItem.vue'

export default {
name:'tabbar',

components:{
     TabbarItem,
}
}
</script>

<style >
#tab-bar{
  /* 利用flex进行布局 */
  display: flex;
  background-color: white;
  box-shadow: 0px -1px 1px #999;
  height: 49px;

  /* 定位相关 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  
}

</style>