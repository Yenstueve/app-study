<template>
      <div class="recommends">
        <div v-for="item in recommends" class="recommenditem" :key="item.id">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
      </div>
</template>

<script>

export default {
     name:"RecommendView",
     props:{
         recommends:{
             type:Array,
             default(){
                 return[]
             }
         }
     }
}
</script>

<style scoped>
 .recommends{
     display: flex;
      align-content: center;
      text-align: center;
      font-size: 16px;
      padding: 4px 0px 8px;
      border-bottom: 4px solid lightgray;
      width: 100%;
 }
 .recommenditem{
     flex: 1;
 }
 .recommenditem img{
     width: 65px;
     height: 65px;
     margin-bottom: 4px;
 }
</style>