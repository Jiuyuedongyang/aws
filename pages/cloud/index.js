const app = getApp();

Page({
  data: {
    userInfo: "",
    isShow: true,
  },

  
  handleGetUserInfo(data) {
    //判断用户点击的是否是允许
    if (data.detail.rawData) {//如果存在信息说明之前已经允许过
      this.OnloadGetUserInfo();
    }
  },


  getOpenId: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        console.log(res.code)//打印wx.login()返回的code码，通过code码发送给flask生成openid
        wx.request({
          url: 'https://aws.aws-superman.top:5001/get_openid',
          data: {
            code: res.code
          },
          method: 'GET',
          success(res) {
            console.log("get")
            // console.log(res)
            console.log(res.data)//res.data是flask返回的openid数据
            let openid=res.data
            console.log("openid= ",openid)
            that.setData({
              openid:openid
            })
            wx.setStorageSync('openid',openid)
          }
          
        })


      
      }
    })
    // setTimeout(function () {
      
    //   console.log("延迟函数")
    
    //   console.log("延迟函数")
    //   //要延时执行的代码
    // }, 3000) //延迟时间 这里是2秒
  }
,


  OnloadGetUserInfo() {
    //先wx.getSetting()看用户是否授权
    wx.getSetting({
      success: (data) => {
        if (data.authSetting["scope.userInfo"]) {
          //用户已经授权
          this.setData({
            isShow: false,
          });


            this.getOpenId()







          









          
        } else {
          //没有授权
          this.setData({
            isShow: true,
          });
        }



      },
    });

    //获取用户登录的信息
    wx.getUserInfo({
      success: (data) => {
        console.log(data.userInfo.nickName)
        wx.setStorageSync('nickName', data.userInfo.nickName)
        // console.log(data.rawData)
        this.setData({
          userInfo: data.userInfo,
        });
      }
    });
  },

  goto_page_user_openid(){
    wx.navigateTo({
      url: '../user_openid/index',
    })
  },
  






  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log("页面加载");
    this.OnloadGetUserInfo();
  },

});
