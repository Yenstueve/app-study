import { mutations } from "vuex"

const mutations = {

    [ADD_COUNTER](state,payload){
        payload.count++
    },
    [ADD_TO_CART](state,payload){
        payload.checked = true
        state.cartList.push(payload)
    }
  }
  
  export default mutations