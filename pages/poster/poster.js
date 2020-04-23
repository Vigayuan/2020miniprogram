// pages/poster/poster.js

import api from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: '',
    canvasWidth: 0,
    canvasHeight: 0,
    imgurl: ''
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

  },
  // 获取用户信息，生成海报
  getUserInfo: function(e) {
    var that = this
    console.log(e)
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              console.log(res)
              that.setData({
                userinfo: res
              })
              that.canvasImg()
            },
            fail(err) {
              console.log(err)
            }
          })
        } else {
          console.log('您拒绝了授权')
          wx.showModal({
            content: '检测到您没打开个人信息权限，是否去设置打开？',
            confirmText: "确认",
            cancelText: "取消",
            success: function(res) {
              console.log(res);
              //点击“确认”时打开设置页面
              if (res.confirm) {
                console.log('用户点击确认')
                wx.openSetting({
                  success: () => {
                    wx.getUserInfo({
                      success(res) {
                        that.setData({
                          userinfo: res
                        })
                        that.canvasImg()
                      },
                      fail(err) {
                        console.log(err)
                      }
                    })
                  }
                })
              } else {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  // 绘制海报
  async canvasImg() {
    var that = this
    wx.showLoading({
      title: '正在生成图片',
    })
    await this.getQRcode()
    console.log(that.data.imgurl)
    
    var name = that.data.userinfo.userInfo.nickName
    var img = that.data.userinfo.userInfo.avatarUrl
    

    // const fsm = wx.getFileSystemManager();
    // const fileName = wx.env.USER_DATA_PATH + '/qrcode.png'
    // fsm.writeFileSync(fileName, that.data.buffer, 'binary')
    // console.log(fileName)
    // 获取小程序二维码图片
    // wx.getImageInfo({
    // 缓存二维码的地址
    // src: that.data.qrImg,
    // success: function (res) {
    //   console.log('success')
    //   var load = res
    wx.getImageInfo({
      // 缓存用户头像img
      src: img,
      success: function(res) {
        console.log(res)
        var height, width
        wx.getSystemInfo({
          success: function(res) {
            width = res.screenWidth
            height = res.screenHeight
            console.log(width, height)
            that.setData({
              canvasWidth: width,
              canvasHeight: height
            });
          },
        })
        var x = width/750
        const ctx = wx.createCanvasContext('shareCanvas', this);
        // 绘制背景
        // ctx.drawImage('../../images/bg.png', 0, 0, 750*x, 1206*x)
        ctx.fillRect(0, 0, 750 * x, 1206 * x)
        ctx.save()
        ctx.setTextAlign('center')
        ctx.setFillStyle('#ffcc00')
        ctx.setFontSize(16)
        ctx.fillText(name, 375 * x, 250 * x)
        ctx.setFontSize(14)
        ctx.fillText('邀请您使用小程序', 375 * x, 300 * x)
        ctx.setFontSize(14)
        ctx.fillText('点击保存至相册', 375 * x, 1160 * x)
        ctx.save()
        // 绘制圆形头像框
        ctx.setStrokeStyle('rgba(0,0,0,.2)')
        ctx.arc(375 * x, 140 * x, 60 * x, 0, 2 * Math.PI)
        ctx.setStrokeStyle('rgba(0,0,0,.2)')
        ctx.arc(375 * x, 660 * x, 120 * x, 0, 2 * Math.PI)
        ctx.fill('#003399')
        //头像
        ctx.clip();
        ctx.drawImage(res.path, 315 * x, 80 * x, 120 * x, 120 * x);
        //小程序码
        ctx.clip();
        ctx.drawImage(that.data.imgurl, 255 * x, 540 * x, 240 * x, 240 * x);
        
        ctx.save();
        ctx.stroke();
        ctx.draw();

        wx.hideLoading()
      }
    })
    //   }
    // })
  },
  // 保存至相册
  saveToPhotosAlbum: function() {
    var that = this
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.saveImg()
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.saveImg()
            },
            fail() {
              wx.showToast({
                title: '您拒绝了小程序使用相册权限',
                icon: 'none'
              })
            }
          })
        } else {
          wx.openSetting({
            success(res) {
              if (res.authSetting['scope.writePhotosAlbum']) {
                that.saveImg();
              } else {
                wx.showToast({
                  title: '您没有授权，无法保存到相册',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
  },
  // 保存图片
  saveImg: function() {
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: function(res) {
        wx.hideLoading()
        var tempFilePath = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showModal({
              title: '图片已保存至相册',
              content: '赶快去晒一下吧',
              confirmText: '好的',
              confirmColor: '#333333',
              success: function(res) {
                if (res.confirm) {
                  var arr = []
                  arr.push(tempFilePath)
                  // 全屏预览显示图片
                  wx.previewImage({
                    urls: arr,
                    current: arr
                  })
                }
              },
              fail: function() {

              }
            })
          },
          fail(res) {
            console.log(res)
            wx.showToast({
              title: '出错了',
              icon: "none",
              duration: 2000
            })
          }
        })
      }
    }, this)
  },
  async getQRcode() {
    var that = this
    let qr = await wx.cloud.callFunction({
      name: 'getQrcode'
    })
    let buffer = qr.result.buffer
    const fs = wx.getFileSystemManager()
    var codeimg = wx.env.USER_DATA_PATH + '/' + 'qrcode.png'
    fs.writeFile({
      filePath: codeimg,
      data: buffer,
      encoding: 'base64',
      success: () => {
        that.setData({
          imgurl: codeimg
        })
        console.log(codeimg)
      }
    })
  }
})