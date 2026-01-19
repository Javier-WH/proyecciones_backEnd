import express from 'express'
import SubjectRestrictions from '#models/schedule/subjectsRestrictions.js'
import TeachersRestrictions from '#models/schedule/teacherRestrictions.js'
import Teachers from '#models/teachers.js'
import { validateAdminUser } from '../../middlewares/middlewares.js'

const Router = express.Router()

const WORKING_DAY_MIN = 1
const WORKING_DAY_MAX = 5

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function normalizeHour (value) {
  if (typeof value === 'number') {
    value = value.toString()
  }

  if (typeof value !== 'string') return null

  const trimmed = value.trim()
  if (!trimmed) return null

  const parts = trimmed.split(':')
  if (parts.length > 2) return null

  const hour = Number(parts[0])
  const minute = parts[1] !== undefined ? Number(parts[1]) : 0

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

function normalizeRestrictedDays (daysInput) {
  if (daysInput === undefined || daysInput === null) return []
  if (!Array.isArray(daysInput)) return null

  const normalized = [...new Set(daysInput.map((day) => Number(day)))]
  if (normalized.some((day) => !Number.isInteger(day) || day < WORKING_DAY_MIN || day > WORKING_DAY_MAX)) {
    return null
  }

  return normalized.sort((a, b) => a - b)
}

function normalizeHourEntry (entry) {
  if (!entry || typeof entry !== 'object') return null
  const day = Number(entry.day)

  if (!Number.isInteger(day) || day < WORKING_DAY_MIN || day > WORKING_DAY_MAX) {
    return null
  }

  const start = normalizeHour(entry.start)
  const end = normalizeHour(entry.end)

  if (!start || !end) return null
  if (toMinutes(start) >= toMinutes(end)) return null

  return { day, start, end }
}

function hasOverlap (entries) {
  const byDay = entries.reduce((map, entry) => {
    const list = map.get(entry.day) || []
    list.push(entry)
    map.set(entry.day, list)
    return map
  }, new Map())

  for (const slots of byDay.values()) {
    slots.sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
    for (let i = 1; i < slots.length; i++) {
      if (toMinutes(slots[i].start) < toMinutes(slots[i - 1].end)) {
        return true
      }
    }
  }

  return false
}

function normalizeRestrictedHours (hoursInput) {
  if (hoursInput === undefined || hoursInput === null) return []
  if (!Array.isArray(hoursInput)) return null

  const normalized = []
  for (const entry of hoursInput) {
    const normalizedEntry = normalizeHourEntry(entry)
    if (!normalizedEntry) return null
    normalized.push(normalizedEntry)
  }

  if (hasOverlap(normalized)) {
    return null
  }

  return normalized.sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day
    return a.start.localeCompare(b.start)
  })
}

function formatRestriction (record, teacherId) {
  if (!record) {
    return {
      teacher_id: teacherId ?? null,
      restricted_days: [],
      restricted_hours: []
    }
  }

  return {
    teacher_id: record.teacher_id ?? teacherId ?? null,
    restricted_days: Array.isArray(record.restricted_days) ? record.restricted_days : [],
    restricted_hours: Array.isArray(record.restricted_hours) ? record.restricted_hours : []
  }
}

Router.post('/teacher-restrictions', validateAdminUser, express.json(), async (req, res) => {
  try {
    const { teacher_id: teacherId, restricted_days: restrictedDaysInput, restricted_hours: restrictedHoursInput } =
      req.body || {}

    if (!teacherId) {
      return res.status(400).json({ error: true, message: 'Debe suministrar un ID para el profesor (teacher_id)' })
    }

    const teacherExists = await Teachers.findByPk(teacherId, { attributes: ['id'], raw: true })
    if (!teacherExists) {
      return res.status(404).json({ error: true, message: 'El profesor indicado no existe' })
    }

    const restrictedDays = normalizeRestrictedDays(restrictedDaysInput)
    if (restrictedDays === null) {
      return res.status(400).json({
        error: true,
        message: 'restricted_days debe ser un arreglo de enteros entre 1 (lunes) y 5 (viernes)'
      })
    }

    const restrictedHours = normalizeRestrictedHours(restrictedHoursInput)
    if (restrictedHours === null) {
      return res.status(400).json({
        error: true,
        message:
          'restricted_hours debe ser un arreglo de objetos { day, start, end } con horarios válidos y sin traslapes'
      })
    }

    await TeachersRestrictions.upsert({
      teacher_id: teacherId,
      restricted_days: restrictedDays,
      restricted_hours: restrictedHours,
      restrictions: JSON.stringify({ restricted_days: restrictedDays, restricted_hours: restrictedHours })
    })

    const updated = await TeachersRestrictions.findOne({ where: { teacher_id: teacherId }, raw: true })

    return res.json({
      message: 'Restricciones del profesor guardadas correctamente',
      data: formatRestriction(updated)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al intentar crear o actualizar una restricción para profesor' })
  }
})

Router.get('/teacher-restrictions/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params
    if (!teacherId) {
      return res.status(400).json({ error: true, message: 'Debe suministrar el ID del profesor (teacherId)' })
    }

    const restriction = await TeachersRestrictions.findOne({ where: { teacher_id: teacherId }, raw: true })
    return res.json(formatRestriction(restriction, teacherId))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor al buscar la restricción' })
  }
})

Router.get('/teacher-restrictions', async (_req, res) => {
  try {
    const restrictions = await TeachersRestrictions.findAll({ raw: true })
    return res.json(restrictions.map((restriction) => formatRestriction(restriction)))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor al listar las restricciones' })
  }
})

Router.post('/subjectRestriction', express.json(), async (req, res) => {
  try {
    const { subject_id: subjectId, restrictions } = req.body

    if (!subjectId) {
      return res
        .status(400)
        .json({ error: true, message: 'Debe suministrar un ID para para la materia (subject_id)' })
    }

    if (restrictions === undefined || restrictions === null) {
      return res.status(400).json({ error: true, message: 'Debe suministrar las restricciones' })
    }

    const [, created] = await SubjectRestrictions.upsert(
      { subject_id: subjectId, restrictions },
      { where: { subject_id: subjectId } }
    )

    const statusCode = created ? 201 : 200
    const action = created ? 'creó' : 'actualizó'

    return res.status(statusCode).json({
      message: `La restricción de la materia se ${action} correctamente`
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al intentar crear o actualizar una restricción para la materia' })
  }
})

Router.get('/subjectRestriction', async (req, res) => {
  try {
    const { subject_id: subjectId } = req.query

    if (!subjectId) {
      return res
        .status(400)
        .json({ error: true, message: 'Debe suministrar el ID de la materia (subject_id)' })
    }

    const restriction = await SubjectRestrictions.findOne({ where: { subject_id: subjectId } })

    if (!restriction) {
      return res.status(404).json({ error: true, message: 'Restricción no encontrada para esta materia' })
    }

    return res.json(restriction)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor al buscar la restricción' })
  }
})

export default Router
