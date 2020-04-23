const app = getApp()

const request = (url, options) => {
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${app.globalData.host}${url}`,
      method: options.method,
      // data: options.data,
      // data: JSON.stringify(options.data),
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        // 'content-type':'application/x-www-form-urlencoded',
        'content-type':'application/json;charset=UTF-8',
        'token': 'token'
      },
      success: (res) => {
        if (res.data.code === 1) {
          reslove(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: (res) => {
        reject(res.data)
      }
    })
  })
}

const get = (url, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options
  })
}

const post = (url, options) => {
  return request(url, {
    method: 'POST',
    data: options
  })
}
const put = (url, options) => {
  return request(url, {
    method: 'PUT',
    data: options
  })
}
const remove = (url, options) => {
  return request(url, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove
}