export default function generateSingleQuarterSheet ({ sheetNumber, workbook, pnfArray, proyectionDate }) {
  let pageNumber = Number.parseInt(sheetNumber)
  console.log(pnfArray[0])

  for (const pnf of pnfArray) {
    for (let quarter = 1; quarter <= 3; quarter++) {
      const sheetName = `${pnf[0].pnf} T-${quarter}`.replace('P.N.F. en ', '').replace('P.N.F en ', '').toUpperCase()
      const sheet = workbook.addSheet(sheetName)
      let row = 1
      // encabezado
      const rangeLine1 = sheet.range(`A${row}:I${row}`)
      sheet.cell(`A${row}`).value('PERSONAL DOCENTE')
      rangeLine1.merged(true)
      rangeLine1.style('horizontalAlignment', 'center')
      rangeLine1.style('verticalAlignment', 'center')
      row++

      const rangeLine2 = sheet.range(`A${row}:I${row}`)
      sheet.cell(`A${row}`).value(`${pnf[0].pnf}`.toUpperCase())
      rangeLine2.merged(true)
      rangeLine2.style('horizontalAlignment', 'center')
      rangeLine2.style('verticalAlignment', 'center')
      row++

      const rangeLine3 = sheet.range(`A${row}:I${row}`)
      sheet.cell(`A${row}`).value('U.P.T. DE LOS LLANOS JUANA RAMIREZ, EXTENSIÓN ALTAGRACIA DE ORITUCO')
      rangeLine3.merged(true)
      rangeLine3.style('horizontalAlignment', 'center')
      rangeLine3.style('verticalAlignment', 'center')
      row++

      const rangeLine4 = sheet.range(`A${row}:I${row}`)
      sheet.cell(`A${row}`).value(`CARGA ACADÉMICA ${getQuaterName(quarter)}`)
      rangeLine4.merged(true)
      rangeLine4.style('horizontalAlignment', 'center')
      rangeLine4.style('verticalAlignment', 'center')
      row++

      const rangeLine5 = sheet.range(`A${row}:I${row}`)
      sheet.cell(`A${row}`).value(proyectionDate)
      rangeLine5.merged(true)
      rangeLine5.style('horizontalAlignment', 'center')
      rangeLine5.style('verticalAlignment', 'center')
      row++
      row++

      // encabezado de la tabla
      const rangeLine6A = sheet.range(`A${row}:A${row + 1}`)
      sheet.cell(`A${row}`).value('Profesor')
      rangeLine6A.merged(true)
      rangeLine6A.style('horizontalAlignment', 'center')
      rangeLine6A.style('verticalAlignment', 'center')
      rangeLine6A.style('border', true)

      const rangeLine6B = sheet.range(`B${row}:B${row + 1}`)
      sheet.cell(`B${row}`).value('Unidad Curricular')
      rangeLine6B.merged(true)
      rangeLine6B.style('horizontalAlignment', 'center')
      rangeLine6B.style('verticalAlignment', 'center')
      rangeLine6B.style('border', true)

      const rangeLine6C = sheet.range(`C${row}:C${row + 1}`)
      sheet.cell(`C${row}`).value('Trayecto')
      rangeLine6C.merged(true)
      rangeLine6C.style('horizontalAlignment', 'center')
      rangeLine6C.style('verticalAlignment', 'center')
      rangeLine6C.style('border', true)

      const rangeLine6D = sheet.range(`D${row}:D${row + 1}`)
      sheet.cell(`D${row}`).value('Sección')
      rangeLine6D.merged(true)
      rangeLine6D.style('horizontalAlignment', 'center')
      rangeLine6D.style('verticalAlignment', 'center')
      rangeLine6D.style('border', true)

      const rangeLine6E = sheet.range(`E${row}:E${row + 1}`)
      sheet.cell(`E${row}`).value('Turno')
      rangeLine6E.merged(true)
      rangeLine6E.style('horizontalAlignment', 'center')
      rangeLine6E.style('verticalAlignment', 'center')
      rangeLine6E.style('border', true)

      const rangeLine6FG = sheet.range(`F${row}:G${row}`)
      sheet.cell(`F${row}`).value(getQuaterName(quarter))
      rangeLine6FG.merged(true)
      rangeLine6FG.style('horizontalAlignment', 'center')
      rangeLine6FG.style('verticalAlignment', 'center')
      rangeLine6FG.style('border', true)

      sheet.cell(`F${row + 1}`).value('Horas por U/C')
      sheet.cell(`F${row + 1}`).style('horizontalAlignment', 'center')
      sheet.cell(`F${row + 1}`).style('verticalAlignment', 'center')
      sheet.cell(`F${row + 1}`).style('border', true)
      sheet.cell(`F${row + 1}`).style('wrapText', true)

      sheet.cell(`G${row + 1}`).value('Total de Horas')
      sheet.cell(`G${row + 1}`).style('horizontalAlignment', 'center')
      sheet.cell(`G${row + 1}`).style('verticalAlignment', 'center')
      sheet.cell(`G${row + 1}`).style('border', true)
      sheet.cell(`G${row + 1}`).style('wrapText', true)

      const rangeLine6H = sheet.range(`H${row}:H${row + 1}`)
      sheet.cell(`H${row}`).value('Dedicación')
      rangeLine6H.merged(true)
      rangeLine6H.style('horizontalAlignment', 'center')
      rangeLine6H.style('verticalAlignment', 'center')
      rangeLine6H.style('border', true)

      const rangeLine6I = sheet.range(`I${row}:I${row + 1}`)
      sheet.cell(`I${row}`).value('Observación')
      rangeLine6I.merged(true)
      rangeLine6I.style('horizontalAlignment', 'center')
      rangeLine6I.style('verticalAlignment', 'center')
      rangeLine6I.style('border', true)

      row++
      row++

      // datos de la tabla
      sheet.cell(`A${row}`).value('Hola')

      pageNumber++
    }
  }

  return {
    sheetNumber: pageNumber,
    workbook
  }
}

function getQuaterName (number) {
  switch (number) {
    case 1:
      return 'TRIMESTRE I'
    case 2:
      return 'TRIMESTRE II'
    case 3:
      return 'TRIMESTRE III'
    default:
      return 'DESCONOCIDO'
  }
}
