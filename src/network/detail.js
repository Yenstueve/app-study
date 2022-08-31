//创建detail.js封装 进行请求详情页的商品数据

//1、先导入 request函数 进行请求(之前已经封装了request请求)
import {request} from './request'

export function getDetail(iid){
     return request({
         url:'/detail',
         params:{
             iid
         }
     })
}
export function getRecommend(){
     return request({
       url:'/recommend',
     })
}

//ES6
export class Goods{
    constructor(itemInfo,Columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.Columns = Columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

//
export class GoodsParam {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }
  
  //
  export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }

