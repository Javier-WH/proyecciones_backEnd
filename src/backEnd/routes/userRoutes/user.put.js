import { updateUserController } from '#querys/user/userController.js'
import express from 'express'
const Router = express.Router()

Router.put('/user', express.json(), updateUserController)

export default Router
