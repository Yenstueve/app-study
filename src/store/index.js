import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//1、安装插件
Vue.use(Vuex)

//2、创建Store对象
const store = new Vuex.Store({
  namespaced:true,
  getters,
  state: {
    CartList:[],

 },

  //一般修改state都要经过mutations
  mutations: {
     addToCart(state,payload){
      //1、方法一：payload新添加的商品--判断新加的商品iid和CartList中商品的iid是否一致
    //  let oldProduct = null
    //   for(let item of state.CartList){
    //     if(item.iid == payload.iid){
    //      oldProduct = item
    //     }  }


       //1、方法二：直接查找之前数组中是否含有该商品
       let oldProduct = state.CartList.find(item => item.iid == payload.iid)    

      // let oldProduct = state.CartList.find(item => item.iid === payload.iid)
      //2、继续做判断oldProduct，如果
        if(oldProduct){
          oldProduct.count += 1
        }else{
          payload.count = 1
        state.CartList.push(payload)
      }
     },
     
  },
  actions: {
  },
  modules: {
  }
})
 export default store