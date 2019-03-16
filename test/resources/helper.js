
module.exports.resourceTest = ({
  BASE,
  client,
  request,
  resources
}) => {
  resources.forEach(resource => {
    const {
      name,
      expectedVal,
      method = 'post'
    } = resource

    const url = BASE + '/' + name

    it(`${method.toUpperCase()} ${url}`, () => {
      if (expectedVal) {
        client[name](expectedVal)
        expect(request[method]).toHaveBeenCalledWith(url, expectedVal)
      } else {
        client[name]()
        expect(request[method]).toHaveBeenCalledWith(url)
      }
    })
  })
}
