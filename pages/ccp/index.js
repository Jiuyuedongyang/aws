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
      url: 'https://aws.aws-superman.top/if_vip-aws-superman-2020',
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
  onShow_if_on_off() {

    let that = this
    wx.request({
      url: 'https://aws.aws-superman.top/if_on_off-aws-superman-2020',
      data: {},
      method: 'GET',
      success(res) {
        console.log(res)
        console.log("if_on_off_saa " + res.data.if_on_off_saa)
        console.log("if_on_off_sap " + res.data.if_on_off_sap)
        that.setData({
          if_on_off_saa: res.data.if_on_off_saa,
          if_on_off_sap: res.data.if_on_off_sap,
          saa_update_time:res.data.saa_update_time,
          notification_ccp:res.data.notification_ccp
        })
      },
      fail(res) {
        console.log("if_on_off失败")
      }

    })
  },
  // test222() {
  //   console.log(this.data)
  // },




  //分享本页面给朋友
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'AWS云题库ccp-c01☁️',
      path: '/pages/ccp/index'
    }

  },
  //分享到朋友圈
  onShareTimeline: function () {
    return {
      title: 'AWS云题库',
      path: 'pages/saa/index',
    }
  },





  onLoad: function (options) {
    wx.showToast({
      title: '请加微信aws_superman加入学习群',
      icon: 'none',
      duration: 1500,
      mask: true
    })

    this.onShow_if_on_off() 
  },

  onShow: function (options) {
   
  }


});