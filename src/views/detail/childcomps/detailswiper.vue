<template>

      <swiper class="detail-swiper" >
      <swiper-item  v-for="item in topImages" :key="item.id">
          <img :src="item" alt="">
      </swiper-item>
      </swiper>

</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'


export default {
    name:'detailswiper',
    components:{
        Swiper,
        SwiperItem,

    },
    //因为详情页的轮播图 也是从请求的数据中拿到具体的轮播图数据，所以要把数据传过来
    props:{ 
       topImages:{
           type:Array,
           default(){
               return []
           }
       }
    },

}
</script>

<style scoped>
 .detail-swiper{
    height: 300px;
    overflow: hidden;
 }
</style>