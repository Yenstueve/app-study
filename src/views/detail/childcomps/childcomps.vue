<template>
  <div id="detail-nav" >
      <!--1、导航栏-->
    <navbar>
        <div slot="left" class="back" @click="backClick">
          <img src="../../../assets/img/common/back.png">
        </div>
        <div slot="center" class="titles">
            <div  class="titles-item" 
                 v-for="(item,index) in titles" :key="item.id"  
                 :class="{active: index === currentIndex}"
                 @click="titlesclick(index)">{{item}}</div>
        </div>
    </navbar>

  </div>
</template>

<script>
import Navbar from '../../../components/common/navbar/navbar'


export default {
    name:'childcomps',
    components:{
        Navbar,
    },
    data(){
      return{
          //将导航栏的几个标题存起来
          titles:['商品','参数','评论','推荐'],
          currentIndex:0,
      }
    },
    methods:{
      titlesclick(index){
         this.currentIndex = index
         //监听点击navbar的点击事件,并将其发送出去
         this.$emit('titleClick',index)
      },
      backClick(){
          //方法还有：this.$router.go(-1)
       this.$router.back()
    },
    },


}
</script>

<style scoped>
 .titles{
     display: flex;
     font-size: 18px;
 }
 .titles-item{
     flex: 1;
 }
 .active{
     color:deeppink;
 }
 .back img{
    margin-top: 12px;
    widows: 28px;
    height:28px

 }
</style>