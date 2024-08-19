import getApiToken from '../dataBase/querys/Autorization/getApiToken.js'

export default async function fethProgramasAPI () {
  const token = await getApiToken()

  if (!token) {
    console.error('No se ha podido obtener el token de la API de SAGA')
    return null
  }

  const url = `${process.env.API_URL || 'http://0.0.0.0:8000/api/v1'}/programas`
  const method = 'GET'
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  try {
    const response = await fetch(url, { method, headers })
    if (response.status !== 200) {
      console.log(response.status)
      return null
    }
    const programasData = await response.json()

    return programasData.data ? programasData.data : null
  } catch (error) {
    console.error(error)
    return null
  }
}
