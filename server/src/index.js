import express from 'express'
import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import config from 'config'
import path from 'path'
import https from 'https'
import fs from 'fs-extra'
import routes from './routes'
import botCommander from './botCommander'
import commandsConfig from './commandsConfiguration'

// const STATIC_FILES_DIRECTORY = path.join(__dirname,'../client/static')

const privateKey  = fs.readFileSync(path.join(__dirname,'../config/server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname,'../config/server.cert'), 'utf8');
const credentials = {key: privateKey, cert: certificate}

const app = express()
const httpsServer = https.createServer(credentials, app)
expressWs(app, httpsServer)

app.use(bodyParser.json())
// app.use(express.static(STATIC_FILES_DIRECTORY))
app.use('/api', routes())

commandsConfig
  .filter(command=>!command.disabled)
  .forEach(command=>{
    botCommander.addCommand(command, require(`./commands/${command.name}`)[command.fn||'default'])
  });

const port = config.PORT || 3001

httpsServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
