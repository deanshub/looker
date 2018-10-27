import detect from '../detectors/coco'
let processing = false

export default function(ws, req) {
  ws.on('message', (message) => {
    if (!processing){
      processing = true
      detect(message)
      console.log(message);
      // ws.send()
      processing = false
    }
  })
}
