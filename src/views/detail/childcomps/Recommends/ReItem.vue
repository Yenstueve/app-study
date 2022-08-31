<template>
  <div class="ReItem">
       <img :src="reitems.image" alt="" @load="reimgload" >
       <div class="reitem-info">
           <p>{{reitems.title}}</p>
            <span class="discount">{{reitems.discountPrice}}</span>
           <span class="price">{{reitems.price}}</span>
       </div>
  </div>
</template>

<script>
export default {
    name:'ReItem',
     props:{
         reitems:{
             type:Object,
             default(){
                 return {}
             }
         }
     },
  methods:{
     reimgload(){
        this.$bus.$emit('reimagload')
     }
  },

}
</script>

<style scoped>
/* 这是整个推荐图片的大框架样式*/ 
.ReItem{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}
.ReItem img{
    width: 100%;
    border-radius: 5px; /*图片圆角*/
}
.reitem-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
.reitem-info p{
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.reitem-info .discount {
    color: red;
    margin-right: 20px;
  }
  .reitem-info .collect {
    position: relative;
  }
  .reitem-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
  }
</style>