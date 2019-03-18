
const Request = require('../lib/request')
const axios = require('axios')
const API = require('../lib/api')
const CODES = require('../lib/response-codes')

const axiosCreate = axios.create

describe('Request', () => {
  let req
  let requestSpy

  beforeEach(() => {
    requestSpy = jest.fn().mockResolvedValue({
      data: { lists: [] },
      status: 200
    })
    axios.create = jest.fn().mockReturnValue({ request: requestSpy })
    req = new Request(process.env.ITERABLE_API_KEY)
  })

  afterEach(() => {
    axios.create = axiosCreate
  })

  it('rejects with no apiKey', () => {
    let err
    try {
      req = new Request()
    } catch (e) {
      err = e
    }

    expect(err.message).toBe('apiKey is required')
  })

  it('rejects with bad apiKey', () => {
    req = new Request('blah')
    const err = new Error('denied')
    err.response = { status: 401 }
    requestSpy.mockRejectedValue(err)
    return req.get(API[0].resource)
      .then(() => {
        expect(false).toBe(true)
      })
      .catch(err => {
        expect(err.response.status).toBe(401)
        expect(axios.create).toHaveBeenLastCalledWith({
          baseURL: 'https://api.iterable.com/api',
          headers: {
            'Api-Key': 'blah',
            'Content-Type': 'application/json'
          }
        })
      })
  })

  it('succeeds with GET', () => {
    return req.get(API[0].resource)
      .then(res => {
        expect(res.data.lists).toBeInstanceOf(Array)
        expect(res.status).toBe(200)
        expect(axios.create).toHaveBeenLastCalledWith({
          baseURL: 'https://api.iterable.com/api',
          headers: {
            'Api-Key': process.env.ITERABLE_API_KEY,
            'Content-Type': 'application/json'
          }
        })
        expect(requestSpy).toHaveBeenLastCalledWith({
          url: API[0].resource,
          method: 'get',
          params: {}
        })
      })
  })

  it('succeeds with GET params', () => {
    return req.get(API[0].resource, { limit: 100 })
      .then(res => {
        expect(res.data.lists).toBeInstanceOf(Array)
        expect(res.status).toBe(200)
        expect(axios.create).toHaveBeenLastCalledWith({
          baseURL: 'https://api.iterable.com/api',
          headers: {
            'Api-Key': process.env.ITERABLE_API_KEY,
            'Content-Type': 'application/json'
          }
        })
        expect(requestSpy).toHaveBeenLastCalledWith({
          url: API[0].resource,
          method: 'get',
          params: { limit: 100 }
        })
      })
  })

  it('succeeds with POST', () => {
    requestSpy.mockResolvedValue({
      data: { msg: '', code: CODES.SUCCESS, params: null },
      status: 200
    })

    return req.post('/users/update', {
      email: 'some@email.com',
      dataFields: {
        some: 'custom_field'
      }
    })
      .then(res => {
        expect(res.data.code).toBe(CODES.SUCCESS)
        expect(res.status).toBe(200)
      })
  })

  it('succeeds with DELETE', () => {
    requestSpy.mockResolvedValue({
      data: { msg: '', code: CODES.SUCCESS, params: null },
      status: 200
    })

    return req.delete('/users/some@email.com')
      .then(res => {
        expect(res.data.code).toBe(CODES.SUCCESS)
        expect(res.status).toBe(200)
      })
  })
})
