// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      page:'pages/index/index',
      scene: 'a=1'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}