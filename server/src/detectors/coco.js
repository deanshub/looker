import path from 'path'
import fs from 'fs-extra'
import xhr from 'xhr2'
global.XMLHttpRequest = xhr
import fetch from 'node-fetch'
global.fetch = fetch

import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-node'

import {Image, createCanvas} from 'canvas'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

async function loadImage(buffer) {
  // const buffer = await fs.readFile(imgPath)
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = err => reject(err)
    img.onload = () => resolve(img)
    img.src = buffer;
  })
}

async function look(imgPath) {
  const img = await loadImage(imgPath)
  const canvas = createCanvas(img.width, img.height)
  canvas.getContext('2d').drawImage(img,0,0);

  // const net = await cocoSsd.load('mobilenet_v1')
  const net = await cocoSsd.load('lite_mobilenet_v2')
  const predictions = await net.detect(canvas)
  return predictions
}

function personExists(predictions) {
  // console.log(predictions);
  return predictions.find(prediction=>prediction.class==='person')
}

// async function run(){
//   const files = [1,2,3,4,5,6,7,8,9,10]
//   for (const fileName of files) {
//     const imgPath = path.join(__dirname,`../data/hole/${fileName}.jpg`)
//     const predictions = await look(imgPath)
//     // console.log(`${fileName}) ${JSON.stringify(predictions,null,2)}`);
//     const exists = personExists(predictions)
//     console.log(`${fileName}) ${exists?'yes':'no'}`);
//   }
// }
// run().catch(console.error)

export default async function detect(img) {
  const predictions = await look(img)
  const exists = personExists(predictions)
  return exists
}


// import botCommander from './botCommander'
// import commandsConfig from './commandsConfiguration'
//
// commandsConfig
//   .filter(command=>!command.disabled)
//   .forEach(command=>{
//     botCommander.addCommand(command, require(`./commands/${command.name}`)[command.fn||'default'])
//   });
