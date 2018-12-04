const validationSchema = {
  'Meetups': {
    requiredFields: ['ID', 'Location', 'Region', 'Date', 'Presenters']
  },
  'Presenters': {
    requiredFields: ['Name', 'TD', 'Meetup']
  },
  'Locations': {
    requiredFields: ['Name', 'Region', 'FullName', 'DisplayName', 'Address']
  }
}

const loadAndValidate = jsonFileName => {
  const array = require(`../data/${jsonFileName}`)

  return validate(array, jsonFileName)
}

const validate = (array, jsonFileName) => {
  if (!validationSchema[jsonFileName])
    throw new Error('Invalid JSON filename')

  const requiredFields = validationSchema[jsonFileName].requiredFields

  array.map(object => {
    requiredFields.map(field => {
      if (!object[field]) {
        throw new Error(`
${field} is a required field in ${jsonFileName} data.
Problematic object:
${JSON.stringify(object, null, 2)}
`)
      }
    })
  })

  return array;
}

module.exports = { loadAndValidate, validate }
