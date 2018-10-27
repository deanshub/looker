import express from 'express'

import detect from './apis/detect'
import capture from './apis/capture'

export default () => {
  const router = express.Router()

  router.post('/capture',capture)
  router.ws('/detect', detect)

  return router
}
