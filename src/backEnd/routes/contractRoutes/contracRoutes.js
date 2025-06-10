import { getContractTypes, updateContractType } from '#querys/Contracts/Contracts.js'
import express from 'express'
const Router = express.Router()

Router.get('/contractTypes', getContractTypes)

Router.put('/contractType', express.json(), updateContractType)

export default Router
