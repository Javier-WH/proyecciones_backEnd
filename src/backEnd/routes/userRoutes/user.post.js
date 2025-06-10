import { createUserController, loginUserController } from '#querys/user/userController.js'
import express from 'express'
const Router = express.Router()

Router.post('/login', express.json(), loginUserController)

Router.post('/user', express.json(), createUserController)

export default Router
