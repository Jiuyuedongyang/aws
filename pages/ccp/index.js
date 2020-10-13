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
  onShow_if_vip_ccp() {
    
    let that = this
    
    let openid = wx.getStorageSync('openid')
    
    let nickName = wx.getStorageSync('nickName')
    console.log("getopenidsync " + openid)
    wx.request({
      url: 'https://aws.aws-superman.top:5001/if_vip-aws-superman-2020',
      data: {
        openid: openid,
        nickName:nickName
      },
      method: 'GET',
      success(res) {
        console.log("这是和flask openid查询if_vip_ccp的交互结果")
        console.log(res)
        console.log(res.data)
        console.log(res.data.if_vip_ccp)
        console.log(typeof(res.data.if_vip_ccp))
        console.log(res.data.if_vip_ccp)
        that.setData({
          if_vip_ccp: res.data.if_vip_ccp

        })
        console.log('函数')
        console.log(that.data)
        console.log('函数')
      }
      ,fail(res){
        console.log("if_vip_ccp失败")
      }

    })
  },
  // test222() {
  //   console.log(this.data)
  // },
  onLoad: function (options) {},

  onShow: function (options) {
    //在onShow()的时候查询用户是否购买了
    this.onShow_if_vip_ccp()

    // setTimeout(test222(), 3000) //延迟时间 这里是2秒
  }


});