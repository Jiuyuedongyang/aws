// pages/exam_English/index.js
import weSwiper from '../../we-swiper/dist/weSwiper'


const option = {
  touchstart (e) {
    this.weswiper.touchstart(e)
  },
  touchmove (e) {
    this.weswiper.touchmove(e)
  },
  touchend (e) {
    this.weswiper.touchend(e)
  },
  onLoad () {
    new weSwiper({
      animationViewName: 'animationData',
      slideLength: 3,
      initialSlide: 0,
      /**
       * swiper初始化后执行
       * @param weswiper
       */
      onInit (weswiper) {

      },
      /**
       * 手指碰触slide时执行
       * @param weswiper
       * @param event
       */
      onTouchStart (weswiper, event) {

      },
      /**
       * 手指碰触slide并且滑动时执行
       * @param weswiper
       * @param event
       */
      onTouchMove (weswiper, event) {

      },
      /**
       * 手指离开slide时执行
       * @param weswiper
       * @param event
       */
      onTouchEnd (weswiper, event) {

      },
      /**
       *  slide达到过渡条件时执行
       */
      onSlideChangeStart (weswiper) {

      },
      /**
       *  weswiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd (weswiper) {

      },
      /**
       *  过渡时触发
       */
      onTransitionStart (weswiper) {

      },
      /**
       *  过渡结束时执行
       */
      onTransitionEnd (weswiper) {

      },
      /**
       *  手指触碰weswiper并且拖动slide时执行
       */
      onSlideMove (weswiper) {

      },
      /**
       * slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
       */
      onSlideNextStart (weswiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
       */
      onSlideNextEnd (weswiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
       */
      onSlidePrevStart (swiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
       */
      onSlidePrevEnd (weswiper) {

      }
    })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  touchstart(){
    console.log("start")
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})