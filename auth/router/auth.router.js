import { Router } from 'express'
import { signUp, login, loginView, signUpView,logout } from '../controller/auth.controller.js'

const router = Router()

router.route('/signup').get(signUpView).post(signUp)
router.route('/login').get(loginView).post(login)
router.route('/logout').get(logout)

export default router
