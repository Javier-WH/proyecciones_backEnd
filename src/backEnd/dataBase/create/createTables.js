import tableList from './tables.js'
import addPNFColumnToTeacherTable from '../alters/addPNFColumnToTeacherTable.js'

export const createTables = async () => {
  for (const table of tableList) {
    await table.sync()
  }
  await addPNFColumnToTeacherTable()
}

export const dropTables = async () => {
  for (const table of [...tableList].reverse()) {
    await table.drop()
  }
}
