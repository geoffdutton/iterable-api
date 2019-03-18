
const client = require('../').create(process.env.ITERABLE_API_KEY)

async function main () {
  try {
    const email = 'g.dutton+unittest@gmail.com'
    const res = await client.users.update({
      email,
      dataFields: {
        categories: ['VIP', 'person'],
        office: {
          street: '123 Anystreet',
          city: 'Everywhere',
          state: 'TX'
        },
        score: 400
      }
    })

    /*
    { msg: '', code: 'Success', params: null }
     */
    console.log(res)

    const user = await client.users.get({ email })
    /*
    {
      email: 'g.dutton+unittest@gmail.com',
      score: 400,
      office: { city: 'Everywhere', street: '123 Anystreet', state: 'TX' },
      signupDate: '2019-03-18 15:28:39 +00:00',
      profileUpdatedAt: '2019-03-18 15:32:16 +00:00',
      categories: [ 'VIP', 'person' ],
      signupSource: 'API'
    }
     */
    console.log(user.user.dataFields)

    const finalRes = await client.users.delete(email)
    /*
    { msg: '', code: 'Success', params: null }
     */
    console.log(finalRes)
  } catch (e) {
    const response = e.response
    console.log('fatality', response.status, response.data, response.config.url)
    process.exit(-1)
  }
}

main()
