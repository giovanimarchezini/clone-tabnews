import databese from 'infra/database.js'

async function status(request, response) {
  const result = await databese.query("SELECT 1 + 1;")
  console.log(result)
  response.status(200).json({ message: "teste" })
}

export default status