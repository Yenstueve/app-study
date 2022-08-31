<template>

 <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0" >
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more"> 更多 <i class="arrow-right"></i>
        </div>
      </div>

      <div class="info-user" v-if="commentInfo.user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>

      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
            <!--获取时间，要将时间戳转为时间格式化，就要先将其过滤，但是在vue3中没有过滤器了-->
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>

        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
        </div>
      </div>
    </div>

</template>

<script>
import {formatDate} from '../../../commom/utils'

export default {
    name:"DetailCommentInfo",
     props:{
         commentInfo:{
           type:Object,
           default(){
             return {}
             }
         }
     },
    filters:{
        //其中拿到的value就是时间戳
        showDate(value){
      //1、先将拿到的时间戳转化为data对象
      const data = new Date(value * 1000)
       
      //2、将data进行格式化(用的是正则表达式)
         return formatDate(data,'yyyy-MM-dd hh:mm:ss')
        }
    }
}
</script>

<style scoped>
 .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid black;
  }
  .header-title {
    float: left;
    font-size: 15px;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-user {
    padding: 10px 0 5px;
  }
  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail {
    padding: 0 5px 15px;
  }
  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .info-other .date {
    margin-right: 8px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>