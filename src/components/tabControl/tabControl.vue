<template>
  <div class="tabControl">
      <!--变色：定义一个变量currentIndex用来记录点击的是哪个--记录在data中，然后当点击的index == currentIndex时，就给它绑定一个class active
实现，随后绑定定义一个点击事件，监听当前点击的是哪个-->
      <div v-for="(item,index) in titles" :key="item.id" 
             :class="{ active: index === currentIndex}" 
             @click="itemClick(index)"
             class="tabcontrolitem">
          <span>{{item}}</span>
          </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    data(){
        //将当前哪个是否被选中而变色，将其currentIdex记录下来（相当于定义了currentIndex）
        return{
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){  //定义点击方法currentIndexClick，并传入index，将当前选中的赋值给index，再传回去表示当前点击部分且变色
            this.currentIndex = index;
            //将内部数据传递到外面
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scoped>
.tabControl{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: antiquewhite;
    position: sticky;
 /*   top: 44px; */
        height: 40px;
    line-height: 40px;
}
.tabcontrolitem{
    flex: 1;


}
.tabcontrolitem span{
    padding: 5px;
}
.active{
    color: lightcoral;
}
.active span{
      border-bottom: 3px solid lightcoral;
  }


</style>