<template>
  <div>
    <!-- 头部区域 -->
    <div class="mytop">
    <topheard> </topheard>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div class="left">
          <div class="nav-item" @click="setLeftData(index)" :class="{active:selectedIndex == index}" v-for="(item,index) in menusList" :key="index">{{item.cat_name}}</div>
      </div> 
      <div class="right">
        <image class="topimg" src="https://img.alicdn.com/simba/img/TB1WhQTO7voK1RjSZPfSutPKFXa.jpg" mode="aspectFill">
        </image>
        <div class="list" v-for="(item,index) in rightList" :key="index">
          <div class="title">
          <span>/</span> {{item.cat_name}}
          <span>/</span>
          </div>
        <div class="item_list">
          <a :href="'/pages/searchlist/main?query='+ subitem.cat_name" class="item" v-for="(subitem,subindex) in item.children" :key="index">
            <image :src="'https://itjustfun.cn/'+ subitem.cat_icon" mode="aspectFill"> 
            </image>
            <span>{{subitem.cat_name}}</span> 
          </a>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入头部组件
import topheard from "../../components/topheard";
// 引入封装的ajax请求组件
import request from "../../utils/request.js";
export default {
  data() {
    return {
      menusList:[],
      selectedIndex: 0,
      rightList:[]
    }
  },
  methods: {
    setLeftData(index){
      this.selectedIndex = index;
      // 根据 index 得到当前点击的左侧菜单
      this.rightList = this.menusList[index].children;
       console.log(this.rightList);
      

    }
  },
 async mounted() {
   let resLeft = await request("https://itjustfun.cn/api/public/v1/categories");
    // console.log(resLeft);
    this.menusList = resLeft.data.data;
    // 打开页面给左侧内容动态赋值
    this.rightList = this.menusList[this.selectedIndex].children;
    // console.log(this.rightList);
    
  },

 components:{
    topheard
  }
}
</script>

<style lang="less">
@import "./index.less"; 
</style>
