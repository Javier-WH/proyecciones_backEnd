import tableList from './tables.js'
import addPNFColumnToTeacherTable from '../alters/addPNFColumnToTeacherTable.js'
import updateSubjectProfileColumns from '../alters/updateSubjectProfileColumns.js'

export const createTables = async () => {
  for (const table of tableList) {
    await table.sync()
  }
  await addPNFColumnToTeacherTable()
  await updateSubjectProfileColumns()
}

export const dropTables = async () => {
  for (const table of [...tableList].reverse()) {
    await table.drop()
  }
}
