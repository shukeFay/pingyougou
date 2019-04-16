<template>
  <div>
    <!-- 头部区域 -->
    <div class="mytop" :style="{position:isScroll}">
      <div class="search">
        <div class="search_input">
          <input type="text" v-model="query">
          <div class="word">
            <icon type="search" size="20"></icon>
          </div>
        </div>
      </div>
       <div class="tab"> 
      <div
        @click="selectedIndex = index"
        :class="{active:selectedIndex===index}"
        v-for="(item,index) in tabList" 
        :key="index"
      >{{item}}</div>
    </div>
    </div>
    <!-- 顶部 tab -->
   
    <!-- 商品列表 -->
    <div class="goodsList" :style="{marginTop:margintop}">
      <a :href="'/pages/detail/main?id='+item.goods_id" class="item" v-for="(item,index) in goodsList" :key="index">
        <div class="box">
          <div class="left">
            <image :src="item.goods_small_logo"></image>
          </div>
          <div class="right">
            <div class="word">{{item.goods_name}}</div>
            <div class="price">
              <span>￥</span>
              <span>{{item.goods_price }}</span>
              <span>.00</span>
            </div>
          </div>
        </div>
      </a>
      <!-- <div class="footer">我也是有底线的</div> -->
    </div>
  </div>
</template>

<script>
// 引入request
import request from "../../utils/request.js";
export default {
  data() {
    return {
      tabList: ["综合", "销量", "价格"],
      selectedIndex: 0,
      goodsList: [],
      query:'',
      pagenum: 1,
      pagesize: 10,
      isEnd: false,
      isScroll:'static',
      margintop: "0rpx"
    };
  },
  methods:{
    async getDataList(){
      //添加加载动画
      // wx.showNavigationBarLoading();
       if (this.isEnd) {
         // 提示数据已经全部加载
         wx.showToast({
            title: '数据已经加载完毕',
          icon: 'none',
          duration: 1000
         })
         return
      }
     
      //  发送请求
    let url = "https://itjustfun.cn/api/public/v1/goods/search";
    let res = await request.get(url, {
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    });
    
    // console.log(res);
    if (res.data.data.goods.length ==0) {
       //提示数据已经全部加载
        wx.showToast({
          title: '数据已经加载完毕',
          icon: 'none',
          duration: 1000
        })
        // 将开关设置为关
        this.isEnd = true;
        return
    }


    if (this.goodsList.length ==0) {
      this.goodsList = res.data.data.goods;
    }else {
      this.goodsList = this.goodsList.concat(res.data.data.goods)
    }

      // 隐藏下拉框
      wx.stopPullDownRefresh();
    }
  },
   mounted() {
    //  this.goodsList = [];
    // this.isEnd = false;
    //接收参数query
    this.query = this.$root.$mp.query.query;

    this.getDataList();
    
  },
  // 上拉加载事件
  onReachBottom(){
    this.pagenum = this.pagenum +1;
    this.getDataList();
  },
  onUnload(){
    //  this.pagenum = 1;
    this.goodsList = [];
  },
  onPageScroll(scroll){
    if (scroll.scrollTop==0) {
      this.isScroll = 'static';
      this.margintop = "0rpx"
    } else {
      this.isScroll = 'fixed';
      this.margintop = "200rpx"
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    //刷新页面
      selectedIndex = 0
      goodsList = []
      pagenum = 1
      pagesize = 10
      isEnd = false
      isScroll = 'static'
    // 重新获取数据
    this.getDataList();
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
