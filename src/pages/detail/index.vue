<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="lunbo" indicator-dots autoplay>
      <block v-for="(item,index) in detailObj.pics" :key="index">
        <swiper-item>
          <image :src="item.pics_big" class="slide-image" mode="aspcetFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
      <!-- 商品信息 -->
    <div class="box">
      <div class="price">￥{{detailObj.goods_price}}</div>
      <div class="mess">
        <div class="word">{{detailObj.goods_name}}</div>
        <div class="shoucang">
          <span class="iconfont iconshoucang"></span>
          <span>收藏</span>
        </div>
      </div>
      <div class="pass">快递：免运费</div>
    </div>
    <!-- 图文介绍 -->
    <div class="jieshao">
      <div class="title">图文介绍</div>
      <div class="msg" v-html="detailObj.goods_introduce"></div>
    </div>
    <div class="bottom">
      <div class="callme">
        <span class="iconfont icontongyong-lianxikefutubiao"></span>
        <span>联系客服</span>
         </div>
      <div class="cart">
        <span class="iconfont icongouwuche"></span>
        <span @click="toCart">购物车</span>
        </div>
      <div class="incart" @click="addCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>

  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
     detailObj:{},
     goodsList:{}
    };
  },
  methods:{
     toCart(){
      wx.switchTab({
        url:"/pages/cart/main"
      })
    },
    addCart(){
      this.goodsList[this.detailObj.goods_id] = this.detailObj;

      this.detailObj.seleted = true;
      this.detailObj.num = 1;
      try {
        wx.setStorageSync('goods',this.goodsList)
        wx.showToast({
          title: '亲!您的宝贝已加入购物车', //提示的内容,
          icon: 'success', //图标,
          duration: 2000, //延迟时间,
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    // 接收参数
    let goods_id = this.$root.$mp.query.id;
    // console.log(goods_id);
    let res = await request.get("https://itjustfun.cn/api/public/v1/goods/detail",{
      goods_id: goods_id
    });
    this.detailObj = res.data.data;
    // console.log(res.data.data);
    try {
      this.goodsList = wx.getStorageSync('goods')|| {};
    } catch (error) {
      console.log(error);
      
    }
    
  }
  

};
</script>

<style scoped lang="less">
@import "./detail.less";
</style>
