import getTeacherList from '#querys/teachers/getTeacherList.js'
import postTeacher from '#querys/teachers/postTeacher.js'
import express from 'express'

const Router = express.Router()

Router.get('/teachers', async (_, res) => {
  const teachers = await getTeacherList()
  res.json(teachers)
})

Router.post('/teacher', express.json(), postTeacher)

export default Router
