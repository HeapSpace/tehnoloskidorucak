const chalk = require('chalk');

const validationSchema = {
  'Meetups': {
    requiredFields: ['_id', 'ID', 'Location', 'Region', 'Date', 'Presenters']
  },
  'Presenters': {
    requiredFields: ['_id', 'Name', 'TD', 'Meetup']
  },
  'Locations': {
    requiredFields: ['_id', 'Name', 'Region', 'FullName', 'DisplayName', 'Address']
  },
  'Regions': {
    requiredFields: ['_id', 'Name', 'Town', 'lat', 'lng', 'Locations']
  }
}

const validate = (array, jsonFileName) => {
  if (!validationSchema[jsonFileName])
    throw new Error('Invalid JSON filename')

  const requiredFields = validationSchema[jsonFileName].requiredFields

  array.map(object => {
    requiredFields.map(field => {
      if (!object[field]) {
        throw new Error(`
${chalk.bgRed(field)} is a required field in ${chalk.bgCyan(jsonFileName)} data.
Problematic object:
${JSON.stringify(object, null, 2)}
`)
      }
    })
  })

  return array;
}

module.exports = validate
