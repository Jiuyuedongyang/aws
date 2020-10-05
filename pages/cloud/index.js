const app = getApp();

Page({
  data: {
    msg: "mini program",
    userInfo: "",
    isShow: true,
  },

  
  handleGetUserInfo(data) {
    console.log("用户点击了", data);
    //判断用户点击的是否是允许
    if (data.detail.rawData) {
      //用户点击的是允许
      this.OnloadGetUserInfo();
    }
  },
  OnloadGetUserInfo() {
    //判断用户是否授权
    wx.getSetting({
      success: (data) => {
        console.log(data);
        console.log("成功");
        if (data.authSetting["scope.userInfo"]) {
          //用户已经授权
          this.setData({
            isShow: false,
          });
        } else {
          //没有授权
          console.log("用户不授权")
          this.setData({
            isShow: true,
          });
        }
      },
    });

    //获取用户登录的信息
    wx.getUserInfo({
      success: (data) => {
        console.log(data);

        //更新data中userInfo
        this.setData({
          userInfo: data.userInfo,
        });
      },
      fail: () => {
        console.log("获取用户数据失败");
      },
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
    // console.log(this);
    this.OnloadGetUserInfo();
  },

});
