import { getUserController } from '#querys/user/userController.js'
import express from 'express'
const Router = express.Router()

Router.get('/user', getUserController)

export default Router
