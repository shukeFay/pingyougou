<template>
  <div>
    <topheard> </topheard>
    <!-- 轮播图 -->
    <swiper class="loop" circular indicator-dots autoplay>
      <block v-for="(item,index) in imgList" :key="index">
        <swiper-item>
          <image :src="item.image_src" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    
    <!-- 导航 -->
    <div class="cate">
      <div class="item" v-for="(item,index) in cateList" :key="index">
        <image :src="item.image_src" mode="aspectFit"></image>
      </div>
    </div>
    <!-- 楼层 -->
    <div class="floor" v-for="(item,index) in floorList" :key="index">
      <div class="title">
        <image :src="item.floor_title.image_src" mode="aspectFit"></image>
      </div>
      <div class="content">
        <div class="left">
          <image :src="item.product_list[0].image_src" mode="aspectFit"></image>
        </div>
        <div class="right">
          <image v-if="subindex != 0" v-for="(subitem,subindex) in item.product_list" :key="subindex" :src="subitem.image_src"></image>
          </image>
        </div>
      </div>     
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
//引入头部组件
import topheard from "../../components/topheard";

export default {
  data() {
    return {
      imgList: [],
      cateList:[],
      floorList:[]
    };
  },
  // 请求页面中的数据
  async mounted() {
    let urlLoop = "https://itjustfun.cn/api/public/v1/home/swiperdata";
    let res = await request(urlLoop);
    this.imgList = res.data.data;


   // 请求分类数据
    let resCate = await request("https://itjustfun.cn/api/public/v1/home/catitems");
    // console.log(resCate);
    this.cateList = resCate.data.data;

    //请求楼层数据
    let resfloor = await request("https://itjustfun.cn/api/public/v1/home/floordata");
    // console.log(resfloor);
    this.floorList = resfloor.data.data;
  },
  //
  components:{
    topheard
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
