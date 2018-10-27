import path from 'path'
import fs from 'fs-extra'
import xhr from 'xhr2'
global.XMLHttpRequest = xhr

import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-node'

import {Image, createCanvas} from 'canvas'
import * as posenet from '@tensorflow-models/posenet'

async function loadImage(imgPath) {
  const buffer = await fs.readFile(imgPath)
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

  const imageScaleFactor = 1;
  const flipHorizontal = false;
  const outputStride = 16;
  const multiplier = 0.5;

  const net  = await posenet.load(multiplier);
  const pose = await net.estimateSinglePose(canvas, imageScaleFactor, flipHorizontal, outputStride);
  return pose;
}

function personExists(pose) {
  // console.log(pose);
  if (pose.score>0.5){
    return true
  }
  const recognizedParts = pose.keypoints.filter(point => point.score>0.3)
  return recognizedParts.length>2
}

async function run(){
  const files = [1,2,3,4,5,6,7,8,9,10]
  for (const fileName of files) {
    const imgPath = path.join(__dirname,`../data/hole/${fileName}.jpg`)
    const score = await look(imgPath)
    const exists = personExists(score)
    console.log(`${fileName}) ${exists?'yes':'no'}`);
  }
}
run().catch(console.error)
