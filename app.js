//app.js
App({
  globalData: {
    userInfo: null,
    body_saa: []
  },


  getData_saa() {
    console.log("---")
    console.log("---")
    let that = this
    wx.request({
      url: 'https://aws.lycaicai.top:5000', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("res")
        console.log(res)
        that.globalData.body_saa = res
        //将saa的主数据放入storage中
wx.setStorageSync('saa_body', res.data)
      }
    })
    console.log("+++++")
    console.log(this.globalData)
    console.log("+++++")
  },




 
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    this.getData_saa()







  },

})