<template>
<!--将scroll封装起来，以后需要用到滚动的就可以直接依赖这个封装 ,通过ref来拿取更加准确-->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:'scroll',
    props:{
      probeType:{
          type:Number,
          default:0
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      },
      },
    data(){
      return{
          scroll:null
      }
    },

    mounted(){
        //1、创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
        //probeType表示可以进行监听

        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad

    })
     //2、监听滚动的位置
     this.scroll.on('scroll',(position) =>{
         //console.log(position)
         this.$emit('scroll',position)
     })
     //3、监听上拉事件
       this.scroll.on('pullingUp',() =>{
          // console.log('上拉加载更多')
           this.$emit('pullingUp')
       })
    },
    methods:{
      //因为 点击回到顶部，是将better-scroll内的滚动内容回到顶部，所以最终还是要操作scroll的内容
    //所以得先拿到scroll内容，this.scroll,回到顶部就是用.scrollTo方法回到固定的(x,y位置)
    //将这写成方法，就不会在页面上独自占据一行
    scrollTo(x,y,time=300){
    this.scroll.scrollTo(x,y,time)
    },
    //封装finishPUllUp()方法，
    finishPullUp(){
        this.scroll.finishPullUp()
    },
    refresh(){
        this.scroll.refresh()
    }
},


}
</script>

<style scoped>

</style>