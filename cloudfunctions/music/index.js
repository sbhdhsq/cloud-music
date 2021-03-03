// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'hgq-2gnlfuzl793ace52'
})
const TcbRouter = require('tcb-router')
const axios = require('axios')
const BASE_URL = 'https://hgqwx.cn1.utools.club'

// 云函数入口函数
exports.main = async (event, context) => {
  const app =new TcbRouter({
    event
  })

  app.router('playlist',async (ctx, next) =>{
    ctx.body = await cloud.database().collection('playlist')
    .skip(event.start)
    .limit(event.count)
    .orderBy('createTime', 'desc')
    .get()
    .then((res) =>{
      return res
    })
  })
//根据歌单id获取歌单详情
  app.router('musiclist',async(ctx, next) =>{
    console.log('######' + event.playlistId)
    const res = await axios.get(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}`)
    console.log('######' + res)
    ctx.body = res.data
  })
//根据歌曲id获取歌曲播放的url
  app.router('musicUrl', async(ctx, next) => {
    const res = await axios.get(`${BASE_URL}/song/url?id=${event.musicId}`)
    ctx.body = res.data
  })
//根据歌曲id获取歌词
app.router('lyric', async(ctx, next) =>{
  const res = await axios.get(`${BASE_URL}/lyric?id=${event.musicId}`)
  ctx.body = res.data
})

  return app.serve()
}