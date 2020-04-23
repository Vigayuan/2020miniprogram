//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true,
      env: 'viga-s8qsn'
    })
    console.log=()=>{}
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // let code = res.code;
        // if(code){
        //   wx.request({
        //     url: '',
        //     data:{code:code},
        //     method:'POST',
        //     header:{
        //       'content-type':'application/json'
        //     },
        //     success:function(res){
        //       if(res.statusCode == 200){
        //         wx.setStorageSync('openId', res.data)
        //       }else{
        //         console.log(res.errMsg)
        //       }
        //     }
        //   })
        // }else{
        //   console.log('用户登录失败：'+res.errMsg)
        // }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        var that = this;
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        };
      }
    })
    this.getPdList()

  },
  onHide: function () {
  },
  globalData: {
    userInfo: null,
    cartList: [],
    defaultAds:{},
    pdListData:[],
    host:'http://127.0.0.1:8800',
    addressList: [{
      'address': '上海',
      'phone': '18888888888',
      'name': 'viga',
      'sex': 'gentlemen',
      'id': 'adssac'
    },
    {
      'address': '上海',
      'phone': '18888888888',
      'name': 'viga',
      'sex': 'gentlemen',
      'id': 'qwedsa'
    },
    {
      'address': '上海',
      'phone': '18888888888',
      'name': 'viga',
      'sex': 'gentlemen',
      'id': 'dsgfafa'
    }]
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
  deleteData: function () {
    let db = wx.cloud.database({
      env: "viga-s8qsn"
    })
    let cartList = db.collection('cartList')
    cartList.doc("7d44a8205dd64f0101dd4aca074852ce").remove().then(res => {
      console.log('delete:ok')
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取商品数据
  getPdList: function () {
    var that = this
    let db = wx.cloud.database({
      env: "viga-s8qsn"
    })
    let pdList = db.collection('pdList')
    pdList.get().then(res => {
      that.globalData.pdListData = res.data
    })
  }
})