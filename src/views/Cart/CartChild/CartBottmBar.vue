<template>
  <div class="bottom-bar">
      <div class="check-content">
 <check-bottom class="check-button" :is-checked="isSelectAll" />
 <span>全选</span>
      </div>
      <div class="price">
          总价{{totalPrice}}
      </div>
      <div class="checkLength">
          去计算{{checkLength}}()
      </div>
  </div>
</template>

<script>
import CheckBottom from './checkBottom.vue'

export default {
    name:'CartBottomBar',
    components:{
        CheckBottom,
    },
    computed:{
        totalPrice(){
            return '￥' + this.$store.state.CartList.filter(item =>{
                return this.checked
            }).reduce((preValue, item) =>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.CartList.filter(item => item.checked).length
        },
        isSelectAll(){
            if(this.CartList.length == 0) return false
            return !this.CartList.find(item => item.checked)
        }
    },
}


</script>

<style scoped>
.bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    line-height: 40px;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
    border-radius: 50%;
    width: 60px;
}
.check-button{
     width: 20px;
     height: 20px;
     line-height: 20px;
     margin-right: 5px;

}
.price{
    margin-left: 30px;
    flex: 1;
}
.checkLength{
    width: 90px;
    background-color: red;
    color: white;
    text-align: center;
}
</style>