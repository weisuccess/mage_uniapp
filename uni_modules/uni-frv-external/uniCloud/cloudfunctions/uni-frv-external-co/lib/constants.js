const db = uniCloud.database()
const dbCmd = db.command

const frvLogsCollectionName = 'opendb-frv-logs'
const frvLogsCollection = db.collection(frvLogsCollectionName)

const REAL_NAME_STATUS = {
  NOT_CERTIFIED: 0,
  WAITING_CERTIFIED: 1,
  CERTIFIED: 2,
  CERTIFY_FAILED: 3
}

module.exports = {
  db,
  dbCmd,
  frvLogsCollection,
  REAL_NAME_STATUS
}
