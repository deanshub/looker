// import * as tf from '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export default async function(canvas) {
  const net = await cocoSsd.load('lite_mobilenet_v2')
  const predictions = await net.detect(canvas)
  return predictions
}
