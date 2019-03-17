
const Iterable = require('../')

const client = Iterable('<iterable api key>')

// https://api.iterable.com/api/docs#lists_getLists
client.lists.get()
  .then(lists => {
    console.log(lists.lists)
  })
  .catch(error => {
    console.log(error)
  })

// https://api.iterable.com/api/docs#users_getUser
client.users.get({ email: 'some@email.com' })
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error)
  })

// https://api.iterable.com/api/docs#users_getUserById_0
client.users.get({ userId: 'some-unique-user-id' })
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error)
  })
