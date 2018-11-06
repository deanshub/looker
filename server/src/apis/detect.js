import config from 'config'
// import detect from '../detectors/coco'
import detect from '../detectors/opencv'
import {saveImage, saveMatImage} from './capture'
import {sendPhoto} from '../botCommander'

let processing = 1
const OPEN = 1

export default function(ws, req) {
  ws.on('message',async (message) => {
    if (processing>0){
      processing--
      // const startTime = new Date()
      // console.log('processing...');
      const imgData = message.replace(/^data:image\/png;base64,/, '')

      let exists = null
      try {
        exists = await detect(new Buffer(imgData, 'base64'))
      } catch (e) {

      }
      // console.log(exists);

      if (ws.readyState===OPEN) {
        ws.send(exists?1:0)
      }
      if (exists) {

        exists.faces.forEach(({x,y,width,height})=>{
          exists.mat.rectangle([x, y], [width, height], [0, 0, 255], 3)
        })
        const imagePath = saveMatImage(exists.mat)
        console.log(config.ADMIN_CHAT_ID);
        if (config.ADMIN_CHAT_ID) {
          sendPhoto(config.ADMIN_CHAT_ID, imagePath)
        }
        // saveImage(imgData).catch(console.error)
      }
      // console.log('Done processing!', (new Date() - startTime) ,exists);
      processing++
    }
  })
}
