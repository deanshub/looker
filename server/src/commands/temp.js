import broadlinkController from '../broadlinkController'
import botCommander from '../botCommander'

export default function(msg){
  const id = msg.from.id;
  return broadlinkController.checkTemperature().then(temp => {
    return botCommander.sendMessage(id, `${temp}℃`)
  })
}
