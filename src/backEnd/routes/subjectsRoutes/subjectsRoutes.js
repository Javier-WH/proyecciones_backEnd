import { getSimpleSubjectList } from '#querys/subjects/getSimpleSubjectList.js'
import postSubject from '#querys/subjects/postSubject.js'
import express from 'express'
const Router = express.Router()

Router.get('/subjects', async (_, res) => {
  const subjects = await getSimpleSubjectList()
  res.json(subjects)
})

Router.post('/subject', express.json(), postSubject)

export default Router
