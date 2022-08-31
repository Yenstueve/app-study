<template>
<div id="homeswiper">
  <Swiper>
  <!--拿到传入的数据，根据拿到的数据字段是什么，直接绑定+item.字段-->
<SwiperItem v-for= "item in banners" :key="item.id">
  <a :href="item.link">
    <img :src="item.image" alt="" @load="imgload">
  </a>
</SwiperItem>
</Swiper>
</div>
</template>

<script>
import { Swiper,SwiperItem }  from '../../../components/common/swiper'



export default {
    name:"homeswiper",
    //为子组件Homeswiper定义声明一个自定义属性props--banners，拿到banners的值，再到父组件home中直接取调用
    props:{
        banners:{
           type: Array,
           default(){
               return []
           }
        }
    },
components:  { 
   Swiper,
   SwiperItem,
   },
   data(){
    return{
      isload:false
    }
   },
   methods:{
     imgload(){
       //console.log('......')
       if(!this.isload){
       this.$emit('swipperimgload')
       this.isload = true
       }
     }
   }
}
</script>

<style scoped>

</style>