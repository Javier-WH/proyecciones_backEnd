export function validateLogedUser (req, res, next) {
  if (process.env.NODE_ENV !== 'production') return next()
  if (req?.session?.user || req.path === '/') {
    next()
  } else {
    return res.redirect('/')
  }
}

export function validateAdminUser (req, res, next) {
  if (process.env.NODE_ENV !== 'production') return next()
  if (!req?.session?.user) {
    return res.status(401).json({ error: 'Necesitas iniciar sesión para acceder a este recurso' })
  } else if (req?.session?.user?.su) {
    next()
  } else {
    return res.status(401).json({ error: 'Acceso denegado, solo administradores tienen acceso' })
  }
}
