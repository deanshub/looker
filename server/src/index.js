import express from 'express'
import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import config from 'config'
import path from 'path'
import routes from './routes'

// const STATIC_FILES_DIRECTORY = path.join(__dirname,'../client/static')

const app = express()
expressWs(app)

app.use(bodyParser.json())
// app.use(express.static(STATIC_FILES_DIRECTORY))
app.use('/api', routes())

const port = config.PORT || 3001
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})


// import botCommander from './botCommander'
// import commandsConfig from './commandsConfiguration'
//
// commandsConfig
//   .filter(command=>!command.disabled)
//   .forEach(command=>{
//     botCommander.addCommand(command, require(`./commands/${command.name}`)[command.fn||'default'])
//   });
