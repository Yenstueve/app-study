<template>
<!-- 点击商品跳转到详情页，其实就是点击Goodsiitem-->
  <div class="goods-item" @click="itemclick">
      <!--父组件已经把数据传给子组件，那么子组件就可以进行拿数据了-->
      <img :src="goodsItem.show.img" alt="" @load="imgload">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="cfav">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:{
            //类型是根据请求到的数据类型来定的
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
      imgload(){
        //console.log(this.imgload)
        //因为组件Goodsitem离Home组件太远了，this.$bus.$emit()这是将其放到【事件总线】中
        //又因为vue中本来是没有$bus的，所以需要在main.js中进行 vue.prototype.$bus = new vue()
        if (this.$route.path.indexOf('/home')){
        this.$bus.$emit('itemimgload')
        }
      },
      itemclick(){
       // console.log('跳转到详情页')
       this.$router.push('/detail/' + this.goodsItem.iid)
       //因为进入详情页要传递参数，比如每一件商品都有特定的id属性,这时就要把id参数传入进入,这里采用方法一
       //传入参数的方法一：在动态路index.js中的path后面加上id 如：path:'/detail/id
       //传入惨呼方法二：
       // this.$router.push({
      //      path:'/detail',
      //      query:{ iid: this.product.iid}
      // })
      }
    }
}
</script>

<style scoped>
 .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px; /*图片圆角*/
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: red;
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background:url("../../assets/img/common/collect.png") 0 0/14px 14px;
  }
</style>