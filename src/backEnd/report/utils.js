export function getTeacherHous (teacherLoad) {
  // Inicializamos un objeto para almacenar las sumas
  const totalHoras = {
    q1: 0,
    q2: 0,
    q3: 0
  }

  // Iteramos sobre cada objeto en el array
  teacherLoad.forEach(item => {
    // Verificamos si el objeto tiene la propiedad 'hours' y si es un objeto válido
    if (item.hours && typeof item.hours === 'object') {
      // Sumamos las horas, convirtiendo los valores a números usando el operador unario '+'
      // Añadimos un check para asegurarnos de que la clave existe antes de sumar
      if (item.hours.q1 !== undefined) {
        totalHoras.q1 += +item.hours.q1
      }
      if (item.hours.q2 !== undefined) {
        totalHoras.q2 += +item.hours.q2
      }
      if (item.hours.q3 !== undefined) {
        totalHoras.q3 += +item.hours.q3
      }
    }
  })

  // Devolvemos el objeto con las sumas totales
  return totalHoras
}
