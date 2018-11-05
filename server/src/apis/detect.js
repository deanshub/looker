// import detect from '../detectors/coco'
import detect from '../detectors/opencv'
import {saveImage} from './capture'
import {Image} from 'canvas'
let processing = 1
const OPEN = 1

export default function(ws, req) {
  ws.on('message',async (message) => {
    if (processing>0){
      processing--
      const startTime = new Date()
      console.log('processing...');
      const imgData = message.replace(/^data:image\/png;base64,/, '')

      const exists = await detect(new Buffer(imgData, 'base64'))
      console.log(exists);

      if (ws.readyState===OPEN) {
        ws.send(exists.length>0?1:0)
      }
      if (exists) {
        saveImage(imgData).catch(console.error)
      }
      console.log('Done processing!', (new Date() - startTime) ,exists);
      processing++
    }
  })
}
