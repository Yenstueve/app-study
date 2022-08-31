<template>
<div id="home">
<navbar class="home-nav"><div slot="center">购物街</div></navbar>

<scroll class="content" ref="scroll" 
          :probe-type="3" 
          @scroll="contentScroll" 
          :pull-up-load="true"
          @pullingUp="LoadMore" >
  <!--把会用到滚动的其他组件都套到scroll组件中，就可以运用了-->
<homeswiper :banners="banners" :swipperimgload="swipperimgload"/>
<recommend-view :recommends="recommends" />
<feature-view/>
<TabControl class="tab-control"  
                :titles="['流行','新款','精选']"
                @tabClick="tabClick" 
                ref="tabControl"  
                v-show="istabfixed" />
<!--绑定 :goods= 是将"goods['pop'].list中的数据传到 goods中去，即home父组件传给goodslist子组件-->
<!--<goods-list :goods="goods[currentType].list"/>-->
<goods-list :goods="showGoods"/>
</scroll>
<!-- 组件无法直接监听点击事件，.native 就可以监听原生组件的点击事件-->
<back-top @click.native="backClick" v-show="isShowBacktop"/>
</div>
</template>

<script>
//这是导入的子组件
import Homeswiper from './chirldhome/homeswiper'
import RecommendView from './chirldhome/RecommendView'
import FeatureView from './chirldhome/FeatureView.vue'


//这是导入的公共组件(也就是很多地方有用到的)
import navbar from '../../components/common/navbar/navbar.vue'
import TabControl from '../../components/tabControl/tabControl.vue'
import GoodsList from '../../components/Goods/GoodsList'
import Scroll from '../../components/common/scroll/scroll'
import BackTop from '../../components/backTop/backTop'

//这是导入到方法，getHomeMultidata,getHomeGoods
import {getHomeMultidata ,getHomeGoods} from '../../network/home'


export default {
   name:"home",

 components:  { 
   navbar,
   Homeswiper ,
   RecommendView,
   FeatureView,
   TabControl,
   getHomeGoods,
   GoodsList,
   Scroll,
   BackTop,
   },

   //将请求来的数据将其存储起来即可
   data(){
      return {
    //发现数据中有很多数据，取需要的即可，不用全部取，如果要全部取直接return{result:null}
          banners:[],
          recommends:[],
          //将请求到的商品信息保存下来--热门、新款、
          goods:{
         //将请求得到的数据存放在对应的key中，之后要操作直接修改key中的page和list
  //将这三个种类分别在设为当前默认请求页面和数据量，为了区别当在pop中是第二页请求了xx条数据，但在news中还在第一页，请求了x条数据
             'pop':{page:0,list:[]},
             'new':{page:0,list:[]}, 
             'sell':{page:0,list:[]}
          },
          //在此保存变量，以供后面使用，为不写死数据
          //currentType表示为当前展示类型
          currentType:'pop',
          //isShouBacktop表示默认情况下 backtop是否展示，在组件<back-top v-show="isShowBacktop">使用
          isShowBacktop:false,
          //tabitem的吸顶效果，原本的吸顶效果在使用better-scroll插件的作用下失效了
         tabOffsetTop: 0,
         istabfixed:false,
         savehome:0,
      }
   },
   //计算属性
   computed:{
       showGoods(){
         return this.goods[this.currentType].list
       }
   },
       destroyed(){
         console.log('home-destroyed')
    },
    //1、点击进入home组件页面就触发,为了能够保存home组件滚动的位置
       activated(){
         // console.log('activated')
        this.$refs.scroll.scrollTo(0,this.savehome,0)
        //刷新重新计算高度，以免出现又回答顶部的bug
        this.$refs.scroll.refresh()
       },
    //2、离开home组件页面就触发,在离开Home组件还能够保存好离开home组件时停留的位置信息
       deactivated(){
         // console.log('deactivated')
         this.savehome = this.$refs.scroll.scroll.y
       },
   //当组件刚创建就获取数据--即点击进入home组件就获取到了数据
   //那么就是在vue的生命周期函数中的 created()函数刚被创建就调用接口数据并.then()返回数据
   created(){
     //1、请求多个数据（在一创建的时候就进行请求--轮播图的数据，请求方法在data中先进行声明）
    this.getHomeMultidata()
  
    //2、请求商品信息（在一创建的时候就进行请求--商品数据，请求方法在data中先进行声明）
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')



     //监听item每张图片的加载情况
    // this.$bus.$on('itemimgload',() =>{
       // //console.log(',,,,')
      // this.$refs.scroll.refresh()
    // })
  },
     mounted(){   //mounted表示挂载的意思
        //1、图片加载完成的事件监听
      const refresh = document(this.$refs.scroll.refresh,50)
        this.$bus.$on('itemimgload',() =>{
          refresh()
        })
     
        //2、赋值--tab的吸顶效果，获取tabControl的OffsetTop。不能在create中获取，会获取到undefined
        //所有组件都有一个属性 $el: 这时用于获取组件中的元素
       // console.log(this.$refs.tabControl.$el.OffsetTop)
       // this.tabOffsetTop = this.$refs.TabControl
  },

     methods:{
            //3、监听事件的方法 
             //监听点击tabClick
          tabClick(index){
              //console.log(index)
           switch (index) {
               case 0:
            this.currentType = 'pop'
                break
                case 1:
            this.currentType = 'new'
                 break
                 case 2:
                this.currentType = 'sell'
                break
              }
          },
          //绑定监听回到顶部backtop的功能方法
          backClick(){
            //最终是要在home组件中拿到scroll组件data中的scroll
            //先在home组件中拿到上面的整个组件，所以可以直接设置ref="scroll"拿到
            //this.$refs.scroll.scroll
            this.$refs.scroll.scroll.scrollTo(0,0)
          },
          //@scroll="contentscroll", 用此方法来设置滑动在哪个位置展示 backtop，要传入位置position
          contentScroll(position){
            //当位置大于1000时就展示backtop，而isShowBacktop已经存储在data数据中
            //1、判断backtop是否显示
              this.isShowBacktop = (-position.y) > 1000

          //2、决定tabControl是否吸顶(posotion:fixed)
          this.istabfixed = (-position.y) > this.tabOffsetTop
          },

          LoadMore(){
              // console.log('上拉加载更多')
              this.getHomeGoods(this.currentType)
              this.$refs.scroll.scroll.refresh()
          },
            swipperimgload(){
     this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
   },

       //1、当要对数据进行分步操作的时候，可以将在methods中进行操作，在create中进行调用即可
            getHomeMultidata(){
              getHomeMultidata().then(res =>{
       //将请求回来的数据转存到data中的result里面this.result=res,res获取数据
      //现在只需要取data中的其中一个数据，那么就直接this.banner=res.data（这个data是取到的数据）
        this.banners = res.data.banner.list,
        this.recommends = res.data.recommend.list
     })
    },
      //2、对商品信息请求数据进行分步请求
           getHomeGoods(type){
             //当页面滑动的时候，page是变化的，所以page不能写死--得动态获得(每次都会复用的方法数据一般不能写死)
             //滑动页面page变化会导致data中的page发生变化，所以是根据data中的page来进行+1
             const page = this.goods[type].page + 1
              getHomeGoods(type,page).then(res =>{
             //console.log(res)
             //将请求得到的数据 res.data.list 数组塞入到data中 goods[type].list 数组中去
              this.goods[type].list.push(...res.data.list)
            //数组塞入后，要进行page页面的变化，goods[type] 表示商品的类型--pop/new/sell
              this.goods[type].page += 1

              //在对商品进行请求的时候就调用finishPUllUp()方法
              this.$refs.scroll.finishPullUp()
    })
  },
 
  },
}
</script>

<style scoped>
#home{
   /*vh 表示 viewport height*/ 
     height: 100vh;
    position: relative;
}
.home-nav{
  background-color: pink;
  color: white;

 /* 这个是用原生滚动的时候，为了固定导航不跟着滚动，但是现在采用的是better-scroll那么这个样式设置就无效了
 position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;*/
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>