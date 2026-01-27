import databese from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dataBaseVersionResult = await databese.query("SHOW server_version;")
  const dataBaseVersionValue = dataBaseVersionResult.rows[0].server_version
  response.status(200).json({ updated_at: updatedAt, dependecies: { database: { version: dataBaseVersionValue } } })
}

export default status