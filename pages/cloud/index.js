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


  OnloadGetUserInfo() {
    //先wx.getSetting()看用户是否授权
    wx.getSetting({
      success: (data) => {
        if (data.authSetting["scope.userInfo"]) {
          //用户已经授权
          this.setData({
            isShow: false,
          });



          
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
