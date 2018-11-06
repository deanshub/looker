import botCommander from '../botCommander'

export default function(msg){
  const id = msg.from.id;
  return botCommander.sendMessage(id, `It is done`)
}
