import { Router } from 'express'
import {
  loginPage,
  loginUser,
  signinPage,
  signinUser,
  } from '../controllers/userController.js'

const router = new Router()

router.route('/signin')
  .get(signinPage)
  .post(signinUser)

router.route('/login')
  .get(loginPage)
  .post(loginUser)

export default router
