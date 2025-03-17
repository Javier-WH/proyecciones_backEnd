import tableList from './tables.js'

export const createTables = async () => {
  for (const table of tableList) {
    await table.sync()
  }
}

export const dropTables = async () => {
  for (const table of [...tableList].reverse()) {
    await table.drop()
  }
}
