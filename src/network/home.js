import { request } from "../network/request";

//封装一个getHomeMultidata方法，请求拿到轮播图、推荐的数据
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}


//继续封装一个方法getHomeGoods方法，请求拿到商品信息
//要传参，因为要根据传递的参数来拿取不同的页面信息
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        //get方法因为请求中有type指向pop还是news页面和对应的page页面(即一些必要参数)
        //就像路径http://152.136.185.210:7878/api/hy66/home/data?type=pop&page=1 后面要携带具体参数才会展示对应数据
        params:{
            type,
            page,
        }
    })
}

