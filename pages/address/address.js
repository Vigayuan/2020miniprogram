const app = getApp()

// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnBottom:'0',
    addressList:[ ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var  that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.model)
        var model = res.model
        console.log(model.search('iPhone12'))
        if (model.search('iPhone X') != -1 || model.search('iPhone12') != -1) {
          that.setData({
            btnBottom: '68rpx'
          })
        } else {
          that.setData({
            btnBottom: '0'
          })
        }
      },
    })
    this.setData({
      addressList: app.globalData.addressList
    })
  },
  addAddress:function(){
    wx.navigateTo({
      url: '../addadress/addadress',
    })
  },
  checkAddress:function(e){
    console.log(e.currentTarget.dataset.item)
    app.globalData.defaultAds = e.currentTarget.dataset.item
    wx.navigateBack({
      delta:1
    })
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
    this.setData({
      addressList: app.globalData.addressList
    })
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