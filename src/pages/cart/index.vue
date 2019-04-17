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
      <div class="item" v-for="(item, index) in [1,1,1,1,1]" :key="index">
        <div class="check">
          <icon type="success" size="20" color="#eb4450"></icon>
        </div>
        <div class="goods">
          <div class="left">
            <image mode="aspectFill" src="https://img.alicdn.com/bao/uploaded/i4/1099367656/TB2LM.7soR1BeNjy0FmXXb0wVXa_!!1099367656-0-item_pic.jpg_200x200q90.jpg_.webp"></image>
          </div>
          <div class="right">
            <div class="mess">
              4月11日下午2点30分，华为在上海如约发布了国行版华为P30 pro。
            </div>
            <div class="pricenum">
              <div class="price">￥2779.00</div>
              <div class="num">
                <span>-</span>
                <span class="index">3</span>
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="check">
        <icon type="success" size="20" color="#eb4450"></icon>
      </div>
      <div class="word">全选</div>
      <div class="totalp">
        <div class="top">
          合计：<span>￥14110.00</span>
        </div>
        <div class="mes">
          包含运费
        </div>
      </div>
      <div class="pay">
        <button>结算</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: null
    }
  },
  methods: {
    chooseAddress(){
      wx.chooseAddress({
        success: res => {
          this.address = {
            ...res
          }
          console.log(res)
        }
      });
    }
  },
  computed: {
    detailAddree:function(){
      if(this.address) {
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo;
      } else {
        return '';
      }
    }
  },
}
</script>

<style scoped lang="less">
@import "./cart.less";
</style>
