import Joi from 'joi'

const teacherSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  ci: Joi.string().required(),
  type: Joi.string().required(),
  photo: Joi.string().required().allow(null),
  title: Joi.string().required(),
  partTime: Joi.number().required(),
  load: Joi.array().required().allow(null),
  perfil: Joi.array().required(),
  gender: Joi.string().required()
})

const objectSchema = Joi.object().keys({
  q1: Joi.array().items(teacherSchema),
  q2: Joi.array().items(teacherSchema),
  q3: Joi.array().items(teacherSchema)
})

const validateTeacherData = (teacher) => {
  return objectSchema.validate(teacher)
}

export default validateTeacherData
