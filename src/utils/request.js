// 负责封装请求
var request = function (url, method = "get", data = {}, header = {}) {
    return new Promise((resolve, reject) => {
         // 打开加载动画
      wx.showLoading({
        title: '加载中'
      })
        // 执行逻辑
        wx.request({
            url: url,
            method: method,
            data: data,
            header: header,
            success: function (res) {
                resolve(res)
                // 关闭加载框
      wx.hideLoading();
            },
            fail: function (res) {
                reject(res)
            }
        })
    })
}
// 扩展封装request方法
request.get= function(url,data){
   return request(url,'get',data,{})
}

// 暴露方法
export default request