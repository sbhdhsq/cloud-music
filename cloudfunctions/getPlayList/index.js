// 云函数入口文件
const cloud = require( 'wx-server-sdk' )

cloud.init({
  env: 'hgq-2gnlfuzl793ace52'
})
const db = cloud.database()

const playlistCollection = db.collection( 'playlist' )

const axios = require( 'axios' )

const URL =  'https://hgqwx.cn1.utools.club/top/playlist/highquality?before=1503639064232&limit=20'
// 云函数入口函数
exports.main = async (event, context) => {
  
  const{
    data
  } = await axios.get(URL)
  console.log('######' + JSON.stringify(data))

  if (data.code >= 1000){
    console.log(data.msg)
    return 0
  }

  const playlist = data.playlists

  const newData = []

  for(let i=0, len = playlist.length; i < len; i++){
    let pl = playlist[i]

    pl.createTime = db.serverDate()
    newData.push(pl)
  }
  console.log(newData)

  if(newData.length > 0){
    await playlistCollection.add({
      data: [...newData]
    }).then((res) =>{
      console.log('插入成功')
    }).catch((err) =>{
      console.log(err)
      console.error('插入失败')
    })
  }
  return newData.length
}