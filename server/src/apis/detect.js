export default function(ws, req) {
  ws.on('message', (message) => {
    console.log(message);
    // ws.send()
  })
}
