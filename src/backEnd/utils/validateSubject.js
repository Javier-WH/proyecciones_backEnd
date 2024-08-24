import Joi from 'joi'

const subjectSchema = Joi.object({
  id: Joi.string().required(),
  subject: Joi.string().required(),
  hours: Joi.number().required(),
  pnf: Joi.string().required().allow(null),
  seccion: Joi.string().required(),
  quarter: Joi.array().required(),
  pensum_id: Joi.string().required()
})

const objectSchema = Joi.array().items(subjectSchema)

const validateSubjectData = (subject) => {
  return objectSchema.validate(subject)
}

export default validateSubjectData
