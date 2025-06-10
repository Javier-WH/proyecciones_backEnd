import getInscriptionData from '#proyeccion/getInscriptionData.js'
import getPNFPensum from '#proyeccion/getPNFPensum.js'
import createProyection from '#querys/proyections/createProyection.js'
import getActiveProyection from '#querys/proyections/getActiveProyection.js'
import setActiveProyection from '#querys/proyections/setActiveProyection.js'
import getProyections from '#querys/proyections/getProyection.js'
import express from 'express'
const Router = express.Router()

Router.get('/proyecciones/inscriptionData/:pnf/:trayecto', getInscriptionData)

Router.get('/proyecciones/pensum/:pnf/:trayecto', getPNFPensum)

Router.get('/proyeccions', getProyections)

Router.get('/config', getActiveProyection)

Router.post('/proyeccion', express.json(), createProyection)

Router.post('/setProyection', express.json(), setActiveProyection)

export default Router
