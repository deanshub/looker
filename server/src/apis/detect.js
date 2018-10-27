import detect from '../detectors/coco'
import {saveImage} from './capture'
import {Image} from 'canvas'
let processing = 3
const OPEN = 1

export default function(ws, req) {
  ws.on('message',async (message) => {
    if (processing>0){
      processing--

      const exists = await detect(message)

      if (ws.readyState===OPEN) {
        ws.send(exists?1:0)
      }
      if (exists) {
        const imgData = message.replace(/^data:image\/png;base64,/, '')
        saveImage(imgData).catch(console.error)
      }
      processing++
    }
  })
}
