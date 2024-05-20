import { Router } from 'express'
import {
  loginPage,
  loginUser,
  signupPage,
  signupUser,
  } from '../controllers/userController.js'

const router = new Router()

router.route('/signin')
  .get(signupPage)
  .post(signupUser)

router.route('/login')
  .get(loginPage)
  .post(loginUser)

export default router
