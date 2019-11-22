// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"viga-s8qsn"
})
const db = cloud.database({
  env: "viga-s8qsn"
})

exports.main = async (event, context) => {
  try {
    return await db.collection('cartList').where({
      key:event.key
    }).remove()
  } catch (e) {
    console.error(e)
  }
}