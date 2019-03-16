
const Iterable = require('./lib/iterable')
module.exports = Iterable

if (require.main === module) {
  const client = Iterable('api key')
  client.printResources()
  console.log(JSON.stringify(client, null, 2))
}
