const app =getApp()
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHeight: '',
    totalNum:0,
    cartPdList: [],
    // cartPdList: [{
    //   src: '../../images/ic_index_mech.png',
    //   url: '../../images/ic_index_mech.png',
    //   name: '工厂自动阿斯顿撒多撒敖德萨所多撒',
    //   price: 21.54,
    //   id: 1785,
    //   num: 1
    // }, {
    //     src: '../../images/ic_index_mech_screw.png',
    //     url: '../../images/ic_index_mech_screw.png',
    //     name: '螺丝螺帽爱仕达多撒',
    //     price: 21.54,
    //     id: 175275,
    //     num: 10
    //   }, {
    //     src: '../../images/ic_index_el_wire.png',
    //     url: '../../images/ic_index_el_wire.png',
    //     name: '接线敖德萨所多撒奥',
    //     price: 21.54,
    //     id: 17879,
    //     num: 10
    //   }, {
    //     src: '../../images/ic_index_el_control.png',
    //     url: '../../images/ic_index_el_control.png',
    //     name: '控制爱仕达多撒所多',
    //     price: 21.54,
    //     id: 143478,
    //     num: 10
    //   }, {
    //     src: '../../images/ic_index_fs_machining.png',
    //     url: '../../images/ic_index_fs_machining.png',
    //     name: '切削奥术大师大多翁',
    //     price: 21.54,
    //     id: 176787,
    //     num: 10
    //   }, {
    //     src: '../../images/ic_index_mold.png',
    //     url: '../../images/ic_index_mold.png',
    //     name: '冲压模具问题我确认山东干豆腐啊',
    //     price: 21.54,
    //     id: 135543,
    //     num: 10
    //   }, {
    //     src: '../../images/ic_index_press.png',
    //     url: '../../images/ic_index_press.png',
    //     name: '塑料模具过去而同情而维特请回复多少功夫大师',
    //     price: 21.54,
    //     id: 17387857,
    //     num: 10
    //   },],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res, rect) {
        that.setData({
          minHeight: res.windowHeight
        })
      }
    })
    this.getPdList()
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

  },
  goToPage:function(e){
    var _index = e.currentTarget.dataset.index
    // wx.navigateTo({
    //   url: this.data.cartPdList[_index].url,
    // })
    console.log(this.data.cartPdList[_index].url)
  },
  decrease: function (e) {
    var _index = e.currentTarget.dataset.index
    var arr = this.data.cartPdList
    var _num = arr[_index].num
    if (_num === 1) {
      arr.splice(_index, 1)
      wx.cloud.callFunction({
        name:'decrease',
        data:{
          key:"953037125dd6548d01dea726379be782"
        }
      }).then(res => { console.log('delete:ok') }).catch(err => { console.log(err)})
      // this.deleteData()
    } else {
      arr[_index].num--
    }
    this.getTotalNum(arr)
    this.setData({
      cartPdList: arr
    })
  },
  increase: function (e) {
    var _index = e.currentTarget.dataset.index
    var arr = this.data.cartPdList
    arr[_index].num++
    this.getTotalNum(arr)
    this.setData({
      cartPdList: arr
    })
  },
  getTotalNum:function(arr){
    var totalPrice = 0;
    console.log(arr)
    arr.forEach(item=>{
      if (item.price){
      totalPrice += item.price*item.num
      }
    })
    totalPrice = totalPrice.toFixed(2)
    console.log(totalPrice)
    this.setData({
      totalNum: totalPrice
    })
  },
  goToPay:function(){
    console.log(app.globalData.cartList)
    for (let i = 0; i < app.globalData.cartList.length ; i ++){
      if (app.globalData.cartList[i]){
        this.saveToDb(app.globalData.cartList[i])
      }
    }
    wx.showModal({
      title: '出错了',
      content: '还没开发支付页面',
    })
  },
  getPdList:function(){
    // var that = this
    // let db = wx.cloud.database({
    //   env:"viga-s8qsn"
    // })
    // let cartList = db.collection('cartList')
    // cartList.get().then(res => {
    //   console.log(res)
    //   that.setData({
    //     cartPdList:res.data
    //   })
    //   that.getTotalNum(that.data.cartPdList)
    // })
    this.setData({
      cartPdList: app.globalData.cartList
    })
    console.log(this.data.cartPdList)
  },
  saveToDb: function (data) { //保存至数据库
    let db = wx.cloud.database({
      env: "viga-s8qsn"
    })
    let cartList = db.collection('cartList')
    cartList.add({
      data: data
    }).then(res => {
      console.log('add:ok')
    }).catch(err => {
      console.log(err)
    })
  },
})