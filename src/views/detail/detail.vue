<template>

<div id="detail-detail" >
      <!--1、导航栏-->
 <childcomps class="detail-nav" @titleClick="titleClick" ref="nav"/>

      <!--将需要滚动的内容放入scroll中，即可进行滚动-->
 <scroll class="content" :pull-up-load="true" ref="scroll"  @scroll="contentScroll">
      <!--2、轮播图-->
<detailswiper :top-images="topImages"/>
      <!--3、商品信息：标题、价格等-->
<detail-base-info :goods="goods" />
      <!--4、商家信息-->
<detail-shop-info :shop="shop" />
      <!--5、详情页商品信息-->
<detail-goods-info   :detailInfo="detailInfo"  @imageLoad="imageLoad"/>
      <!--6、详情页参数信息，ref为了内部引用，获取其中的元素$el.offsetTop-->
<detailparams-info ref="params" :paramInfo="paramsInfo" />
      <!--7、详情页的评论-->
<detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <!--8、详情页推荐信息-->
<detail-recommends ref="recommends" :recommends="recommends" />
</scroll>
      <!--9、详情页的回到顶部,因为组件没有绑定点击事件，所以要 @Click.native-->
<back-top  @click.native="backTop" v-show="isShowBacktop" />
      <!--10、详情页的底部bar v-on(@)获取子组件监听发出来的事件-->
<detail-bttom-bar @addToCart="addToCart"/>

</div>
</template>

<script>
import childcomps from './childcomps/childcomps'
import Detailswiper from './childcomps/detailswiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo.vue'
import DetailparamsInfo from './childcomps/DetailparamsInfo.vue'
import DetailCommentInfo from './childcomps/DetailCommentInfo.vue'
import DetailRecommends from './childcomps/Recommends/DetailRecommends'
import DetailBttomBar from './childcomps/DetailBttomBar.vue'

//导入封装好的better-scroll
import scroll from '../../components/common/scroll/scroll'

import BackTop from '../../components/backTop/backTop'

//导入刚封装的getDetail方法
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'









export default {
    name:'detail',
    components:{
       childcomps,
       Detailswiper,
       DetailBaseInfo,
       DetailShopInfo,
       scroll,
       DetailGoodsInfo,
       DetailparamsInfo,
       DetailCommentInfo,
       DetailRecommends,
       DetailBttomBar,
       BackTop,
    },

    data(){
       return{
         iid:null,
         topImages:[],
         goods:{},
         shop:{},
         detailInfo:{},
         paramsInfo:{},
         commentInfo:{},
         recommends:[],
         themeTopYs:[0,1000,2000,3000],
         currentIndex:0,
         isShowBacktop:false,
   }
    },
    //1、先在create中获取iid，然后再将其保存在data中
    created(){
        //1、保存存入的iid
        //this.$route是路由的参数对象，$route中有id、path等参数信息
        //this.$router是编程式导航，有this.$router.push(hash地址)/.replace()/.go(数值) =>历史记录前进后退等
      this.iid = this.$route.params.iid
       // console.log(this.$route.params)

       //2、根据iid进行请求数据
    getDetail(this.iid).then(res => {
        console.log(res)
        const data = res.result
        //2.1获取顶部的轮播图
        this.topImages = data.itemInfo.topImages

        //2.2获取详情页的商品信息
       this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
         
        //2.3获取详情页的店铺信息
       this.shop = new Shop(data.shopInfo)

       //2.4获取商品详情数据
       this.detailInfo = data.detailInfo

       //2.5获取详情页的参数信息
       this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

       //2.6获取详情页评论信息，因为有些商品有评论，有些商品没有评论，所以做一个判断
       if(data.rate.cRate !== 0){
             //因为评论不等于0，说明是有评论的，所以取出信息将其保存在commentInfo中
           this.commentInfo = data.rate.list[0]
       }

        // 获取组件themeTopYs的方法 在create中,但是其中不包含图片，所以该方法不可取
   //   this.$nextTick(() =>{
   //     this.themeTopYs =[]
   //     this.themeTopYs.push(0)
   //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
   //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
   //     this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
   //     console.log(this.themeTopYs)
          })
  //  }),
    //3、请求 推荐 的数据
       getRecommend().then(res =>{
            // console.log(res)
             this.recommends = res.data.list
       })
          
          
    },
    mounted(){
          const refresh = document(this.$refs.scroll.refresh,50)
             this.$bus.$on('reimagload',() =>{
                   refresh()
             })
          },
   //在updata中才能正确获取到这些组件的offsetTop，因为要等那些组件完整的渲染出来才能获取到，不然就是undefiend,
   // 或者在create中调用this.$nextTick方法(但是这个不准确，因为图片是没有加载完的),但是这样的结果也是不准确的
 //   updated(){
     //     this.themeTopYs =[]
     //   this.themeTopYs.push(0)
     //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //  this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
     //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
     //   console.log(this.themeTopYs)
 //   },
    methods:{
       imageLoad(){
        this.$refs.scroll.refresh()
        
     //最好是在图片都刷新过后，也就是图片都是最新加载完成的之后 再进行获取offsetTop是最准确的
         this.themeTopYs =[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
       // console.log(this.themeTopYs)
       },
       //进行监听点击title的打印输出是否正确
       titleClick(index){
         // console.log(index)
          //再进行跳转
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
       },

       //监听scroll滚动的位置position，这样才好根据滑动的位置来绑定对应的title
       contentScroll(position){
          //3、是否显示backTop按钮
           this.isShowBacktop = (-position.y) > 1000

         //   console.log(position)   1、可以拿到滚动的位置之后，就要获取滚动的Y值
         const positionY = -position.y
         //2、再根据拿到的positionY值和主题中的值进行对比，看是否和title所在的值一致，一致则变色
    //主题中的值为[0，params.offsetTop，comment.offsetTop，recommends.offsetTop]
    // positionY 在 0-params之间，index=0; positionY 在 params-comment之间，index=1
    // positionY 在 comment-recommends之间，index=2; 超过了recommends，index=3
    //采用遍历的方法 如for in遍历,对象返回的是key,数组返回的是下标，所以返回的是i=0、1、2、3  themeTopYs是保存Y值的
        //但是在这 i 是字符串String类型，如果直接 i+1, 1+1=11  
      //所以要将其类型转化成Num类型 1.parseInt(i) 2.如下
      let length = this.themeTopYs.length
          for (let i =0; i < length; i++ ){
              //  console.log(i)  
            //  if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){   
              //      console.log(i)  这样写会打印不到最后的推荐
           //   }
           if (this.currentIndex !==i && ((i < length - 1 && positionY >= this.themeTopYs[i] 
              && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
                    this.currentIndex = i
                 //  console.log(this.currentIndex)
                this.$refs.nav.currentIndex =this.currentIndex
              }
          }

       },
       backTop(){
             this.$refs.scroll.scroll.scrollTo(0,0)
       },
       //加到购物车，主要是商品的iid、图片、标题、描述、价格
       addToCart(){
             //consol.log('可以监听到加购信息')
      //1、先获取商品的信息
           const product = {}  //先创建一个空,用来存放获取的商品信息
           product.image = this.topImages[0]
           product.title = this.goods.title
           product.desc = this.goods.desc
           product.price = this.goods.realPrice
           product.iid = this.iid;

      //2、将商品加入购物车--存入store中，这是先把商品单独拿出来，再放入购物车组件中,这种情况下用VueX会更好，Vuex就是将东西存放起来的一个对象中
           this.$store.commit('addToCart', product)
       },
    },
}
</script>

<style scoped>

#detail-detail{
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: white;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: white;
}

.content{
  height: calc(100% - 44px - 75px);
 /*  overflow: hidden; */
}

</style>