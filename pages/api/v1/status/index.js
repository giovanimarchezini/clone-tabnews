import database from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dataBaseVersionResult = await database.query("SHOW server_version;")
  const dataBaseVersionValue = dataBaseVersionResult.rows[0].server_version
  const databaseMaxConnectionResult = await database.query("SHOW max_connections;")
  const databaseMaxConnectionValue = databaseMaxConnectionResult.rows[0].max_connections;

  const databaseOpenConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db'");
  const databaseOpenConnectionsValue = databaseOpenConnectionsResult.rows[0].count
  response.status(200).json({
    updated_at: updatedAt, dependecies: {
      database: {
        version: dataBaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        open_connections: databaseOpenConnectionsValue,
      }
    }
  })
}

export default status