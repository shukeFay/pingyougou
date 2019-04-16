<template>
    <div>
        <!-- 搜索框 -->
    <div class="search">
      <div class="search_input">
        <input type="text">
        <div class="word">
          <icon type="search" size="20"></icon>
          <span>搜索</span>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">

.search{
    padding: 20rpx 16rpx;
    background-color: #eb4450;
    .search_input{
        height: 60rpx;
        background-color: #fff;
        border-radius: 8rpx;
        position: relative;
        .word{
            display: flex;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            align-items: center;
            icon {
                margin-right: 10rpx;
            }
            span{
                font-size: 20px;
                color: #bbb;
            }
        }
    }
    
}

</style>
