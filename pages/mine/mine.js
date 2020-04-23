const app = getApp()

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    allHeight:'',
    nickName:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuList:[
      {
        name:'我的订单',
        url:'1',
        icon:'../../images/meh.png'
      }, {
        name: '我的优惠券',
        url: '2',
        icon: '../../images/project.png'
      }, {
        name: '我的积分',
        url: '3',
        icon: '../../images/voice.png'
      }, {
        name: '恢复设置',
        url: '4',
        icon: '../../images/undo.png'
      }, {
        name: '我的设置',
        url: '5',
        icon: '../../images/setting.png'
      }, {
        name: '在线客服',
        url: '6',
        icon: '../../images/phone_line.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            avatarUrl: app.globalData.userInfo.avatarUrl,
            nickName: app.globalData.userInfo.nickName
          })
        }
      })
    }
    // 获取页面的高度
    wx.getSystemInfo({
      success: function (res, rect) {
        console.log(res)
        that.setData({
          allHeight: res.windowHeight
        })
        console.log(that.data.allHeight)
      }
    })
  },

  gotoPage:function(e){
    console.log(e.currentTarget.dataset.url)
  },
  goToCountPage:function(){
    wx.navigateTo({
      url: '../count/count',
    })
  },
  goToAddress:function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  goToSetting:function(){
    wx.navigateTo({
      url: '../set/set',
    })
  },
  goToCouponPage:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  sharePoster:function(){
    wx.navigateTo({
      url: '../poster/poster',
    })
  },
  beComeMemberShip:function(){
    wx.showModal({
      title: '确认开通会员？',
      content: '将扣掉100w',
      success:function(res){
        if(res.confirm){
          wx.showToast({
            title: '你欠我100w',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  allOrders:function(){
    console.log('454544')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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