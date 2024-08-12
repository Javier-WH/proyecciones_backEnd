import tableList from './tables.js'

export const createTables = async () => {
  tableList.forEach(async (table) => {
    await table.sync()
  })
}

export const dropTables = async () => {
  tableList.forEach(async (table) => {
    await table.drop()
  })
}
