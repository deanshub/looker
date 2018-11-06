import botCommander from '../botCommander'

export default function(msg, match){
  const id = msg.from.id;
  return botCommander.sendMessage(id, match[1])
}
