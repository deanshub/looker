import express from 'express'

import detect from './apis/detect'

export default () => {
  const router = express.Router()

  // router.get('/status',status)
  // router.get('/categories', getCategories)
  router.ws('/detect', detect)

  return router
}
