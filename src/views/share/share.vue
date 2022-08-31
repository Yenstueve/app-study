<template>
<div class="wrapper" ref="aaaa">
 <ul class="content">
   <button @click="btnClick">按钮</button>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
     <li>11111111</li>
<li>11111111</li>
     <li>11111111</li>
 </ul>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
     name:'share',
     data(){
       return{
         scroll:null
       }
     },
     //创建后调用
     mounted(){
       this.scroll = new BScroll(this.$refs.aaaa,{
           //滚动监听到滑动的位置：0、1表示不监听，2表示监听手指滑动的过程中、惯性不滑动，3表示只要滑动就监听
           probeType:3,
           pullUpLoad:true
       })
       //监听滚动位置
       this.scroll.on('scroll',(position) =>{
         console.log('position')
       })
       //监听上拉
       this.scroll.on('pullingUp',() =>{
         console.log('上拉加载更多')
       })
     },
     methods:{
       btnClick(){
         console.log('btnClick')
       }
     }
}
</script>

<style scoped>
 .wrapper{
   height: 120px;
   background: brown;
   overflow:hidden;
 }

</style>