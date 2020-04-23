// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['北京','上海','广东','浙江','江苏','福建'],
    latitude:'',
    longitude:'',
    index: 0, markers: [{
      iconPath: "../../images/location.png",
      id: 0,
      latitude: 31.22355,
      longitude: 121.45599,
      width: 20,
      height: 20
    }],
    polyline: [{
      points: [{
        latitude: 31.23,
        longitude: 121.46,
      }, {
          latitude: 31.24,
          longitude: 121.48,
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }]
  },
  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  regionchange(e) {
    console.log(e)
  },
  markertap(e) {
    console.log(e.markerId)
  },

  chesslocation:function(){
    wx.chooseLocation({
      success:function(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
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