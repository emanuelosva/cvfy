const { default: slugifyLib } = require('slugify')
const { BusinessError } = require('../BussinesError')

const slugify = (string, separator = '-') => {
  checkIfIsSluglable(string)

  return slugifyLib(string, {
    replacement: separator,
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  })
}

const checkIfIsSluglable = (value) => {
  const allowedTypes = ['string', 'number']
  const valueType = typeof value

  if (allowedTypes.includes(valueType)) return null

  try {
    value.toString()
    return null
  } catch (error) {}
  throw new BusinessError('common-modules', `${valueType} not allowed to slugify`)
}

module.exports = slugify
