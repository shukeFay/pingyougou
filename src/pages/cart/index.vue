<template>
  <div class="page">
    <!-- 收货地址 -->
    <div class="address">
      <!-- 没有选择地址的状态 -->
      <div v-if="address == null ? true : false" class="no-address" @click="chooseAddress">
        <div class="word">请选择收货地址</div>
        <div class="iright">
          <span class="iconfont iconright"></span>
        </div>
      </div>
      <!-- 选择地址后的状态 -->
      <div v-else class="yes-address">
        <div class="uname">
          <div class="name">
            收件人: {{address.userName}}
          </div>
          <div class="phone">
            {{ address.telNumber }}
          <span class="iconfont iconright"></span>
          </div>
        </div>
        <div class="uadress">
          {{ detailAddree }}
        </div>
      </div>
      <img class="img" src="../../../static/images/cart_border@2x(1).png" alt="">
    </div>
     <div class="goodsList">
      <div class="title">
        <span class="iconfont iconGroup-"></span>优购生活馆</div>
      <div class="item" v-for="(value, key) in goodsList" :key="key">
        <div class="check">
          <icon @click="sectet(value)" type="success" size="20" :color="value.seleted?'#eb4450':'gray'"></icon>
        </div>
        <div class="goods">
          <div class="left">
            <image mode="aspectFill" :src="value.goods_small_logo"></image>
          </div>
          <div class="right">
            <div class="mess">
              {{ value.goods_name }}
            </div>
            <div class="pricenum">
              <div class="price">￥{{value.goods_price}}</div>
              <div class="num">
                <span @click="sub(value)">-</span>
                <span class="index">{{value.num}}</span>
                <span @click="add(value)">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="check">
        <icon type="success" @click="selectAll" size="20" :color="sAll?'#eb4450':'gray'"></icon>
      </div>
      <div class="word">全选</div>
      <div class="totalp">
        <div class="top">
          合计：<span>￥{{totalPrice}}</span>
        </div>
        <div class="mes">
          包含运费
        </div>
      </div>
      <div class="pay">
        <button @click="Settlement">结算({{totalCount}})</button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入requery
import request from "../../utils/request.js";

export default {
  data() {
    return {
      address: null,
      goodsList: {}
    }
  },
  methods: {
    chooseAddress(){
      // 得到小程序中的收货地址
      wx.chooseAddress({
        success: res => {
          this.address = {
            ...res
          }
           try {
            wx.setStorageSync('address', this.address)
          } catch (error) {
            console.log(error)
          }
        }
      });
    },
    // 选中状态
    sectet(value){
      value.seleted =! value.seleted;
      try {
        wx.setStorageSync('goods',this.goodsList);
        
      } catch (error) {
        console.log(error);
      }
    },
    // 数字框
    add(value){
      value.num ++;
       try {
        wx.setStorageSync('goods',this.goodsList);
        
      } catch (error) {
        console.log(error);
      }
    },
    sub(value){
      value.num --;
      if (value.num ===0) {
        wx.showModal({
        content: '亲!确定删除此宝贝',
        success: res => {
          if (res.confirm) {
            // 1.0 将数据从goods中清除
            delete this.goodsList[value.goods_id]
           
            // 2.0 将数据重新更新到stroage 中的数据
            wx.setStorageSync('goods',this.goodsList);
            //重新给this.goods赋值
            this.goodsList={ ...this.goodsList}
           
          } else if (res.cancel) {
            value.num = 1
             try {
        wx.setStorageSync('goods',this.goodsList);
        
      } catch (error) {
        console.log(error);
      }
          }
        }
        })
      } else {
        
      }
       try {
        wx.setStorageSync('goods',this.goodsList);
        
      } catch (error) {
        console.log(error);
      }
    },
    selectAll(){
       // 让所有的选项状态与当前这个全选一致
      // 将当请求状态保存起来
      var selec = !this.sAll
      // 依次给每个元素设置状态
      Object.keys(this.goodsList).forEach(v => {
        this.goodsList[v].seleted = selec
      })
    },
    // 点击结算按钮，将商品数据提交到服务器中
   async Settlement(){
      var url = "https://itjustfun.cn/api/public/v1/my/orders/create";
      // 创建一个订单对象：
      var orderObj = {

      }
      // 设置订单对象的总价
      orderObj.order_price = this.totalPrice
      // 设置订单对象的地址
      orderObj.consignee_addr = this.detailAddree
      // 设置订单对象的详情
      var orderList = []

      // 设置订单对象的 goods属性
      var goods = []
      Object.keys(this.goodsList).forEach(v => {
        var obj = this.goodsList[v]
        // 判断是否选中
        if (obj.selected) {
          // 创建 order_detail
          var orderItem = {}
          orderItem.goods_id = obj.goods_id
          orderItem.goods_name = obj.goods_name
          orderItem.goods_price = obj.goods_price
          orderItem.goods_small_logo = obj.goods_small_logo
          orderItem.counts = obj.num
          orderItem.selectStatus = obj.selected
          orderList.push(orderItem)
          // 创建 goods
          var goodsObj = {}
          goodsObj.goods_id = obj.goods_id
          goodsObj.goods_number = obj.goods_number
          goodsObj.goods_price = obj.goods_price
          goods.push(goodsObj)
        }
      })
      orderObj.order_detail = JSON.stringify(orderList)
      orderObj.goods = goods
      console.log(orderObj)
      // 将参数提交到服务器
      var res = await request.post(url, orderObj)
      console.log(res) 
    }

  },
  computed: {
    detailAddree:function(){
      if(this.address) {
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo;
      } else {
        return ''; 
      }
    }, 
    //总金额
    totalPrice: function() {
      // 定义一个和
      var sum = 0
      // 遍历一个对象
      Object.keys(this.goodsList).forEach(v=> {
        if (this.goodsList[v].seleted) {
          sum += this.goodsList[v].goods_price*this.goodsList[v].num
        }
      })
      return sum
    },
    totalCount: function(){
      var index = 0;
      Object.keys(this.goodsList).forEach(v => {
        if (this.goodsList[v].seleted) {
          index++
        }
      })
      return index
    },
      // 设置一个全选状态：
    sAll: function(){
      // 得到选中的状态：只要在一个元素没有被选中，就应该为不选中，如果所有的都选中，则选中
      var bool = true;
       Object.keys(this.goodsList).forEach(v => {
        if (!this.goodsList[v].seleted) {
          bool = false
          return
        }
      })
      return bool
    }
  },
   onShow() {
    console.log('onShow')
    try {
      // 动态获取收货地址
      this.address = wx.getStorageSync('address') || null
      // 动态获取购物车中的数据
      this.goodsList = wx.getStorageSync('goods') || {}
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped lang="less">
@import "./cart.less";
</style>
