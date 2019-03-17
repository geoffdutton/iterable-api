
module.exports = {
  padEnd (string, maxLength) {
    if (typeof ''.padEnd === 'function') {
      return string.padEnd(maxLength, ' ')
    }
    const padding = ' '
    let _str = String(string)
    while (_str.length < maxLength) {
      _str += padding
    }

    return _str
  }
}
