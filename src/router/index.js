import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
  }



const home = () => import('../views/home/home');
const mine = () => import('../views/mine/mine');
const share = () => import('../views/share/share');
const shop = () => import('../views/shop/shop');
const detail = () => import('../views/detail/detail');


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
   component:home
  },
  {
    path:'/mine',
   component:mine
  },
  {
    path:'/share',
   component:share
  },
  {
    path:'/shop',
   component:shop
  },
  {
    path:'/detail/:iid',
    component:detail
  },
]
const router = new VueRouter({
  routes
})
export default router
