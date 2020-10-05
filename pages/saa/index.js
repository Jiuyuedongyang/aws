//index.js
//获取应用实例


Page({
  data: {
    test: 'test',
  },


  if_vip() {
    wx.showToast({
      title: '题库未购买',
      icon: 'loading',
      duration: 1500,
      mask: true
    })
    console.log("题库未购买")
  },
  onShow_if_vip_saa() {
    
    let that = this
    
    let openid = wx.getStorageSync('openid')
    console.log("getopenidsync " + openid)
    wx.request({
      url: 'https://aws.lycaicai.top:5001/if_vip',
      data: {
        openid: openid
      },
      method: 'GET',
      success(res) {
        console.log("这是和flask openid查询if_vip_saa的交互结果")
        console.log(res)
        console.log(res.data)
        console.log(res.data.if_vip_saa)
        console.log(typeof(res.data.if_vip_saa))
        console.log(res.data.if_vip_saa)
        that.setData({
          if_vip_saa: res.data.if_vip_saa

        })
        console.log('函数')
        console.log(that.data)
        console.log('函数')
      }
      ,fail(res){
        console.log("if_vip_saa失败")
      }

    })
  },
  // test222() {
  //   console.log(this.data)
  // },
  onLoad: function (options) {},

  onShow: function (options) {
    //在onShow()的时候查询用户是否购买了
    this.onShow_if_vip_saa()

    // setTimeout(test222(), 3000) //延迟时间 这里是2秒
  }


});