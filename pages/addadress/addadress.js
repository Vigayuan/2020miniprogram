const app = getApp()
// pages/addadress/addadress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    address: '',
    doorNum: '',
    phone: '',
    sex: '',
    flag:true
  },
  chooseLocation: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        if (res.addres !== '' && res.name !== '') {
          var name = res.name
          var address = res.address
          var latitude = res.latitude
          var longitude = res.longitude
          that.setData({
            name: name,
            address: address,
            // latitude: latitude,
            // longitude: longitude
          })
        }
      },
      fail: function() {
        console.log('err')
      }
    })
  },
  submitInfo: function(e) {
    var _username = e.detail.value.username
    var _address = e.detail.value.address + e.detail.value.doorNum
    var _phone = e.detail.value.phone
    var _sex = e.detail.value.sex
    this.data.flag = true;
    if (!this.isPhone(_phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none',
      })
      return
    }
    console.log(e.detail)
    var obj = {};
    obj.address = _address
    obj.phone = _phone
    obj.name = _username
    obj.sex = _sex
    obj.id = new Date().getTime()
    app.globalData.addressList.push(obj)
    wx.navigateBack({
      delta: 1
    })
  },
  isPhone: function(val) {
    return /^1[3-9]|d{9}$/.test(val)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})