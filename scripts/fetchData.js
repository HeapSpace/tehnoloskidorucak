const fs = require('fs');
const Airtable = require('airtable');

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base('appNUbQdF6KjbUOHy');

let temporaryPresenters = {
  records: []
};

module.exports = base('Presenters')
  .select({
    // Selecting the first 1000 records in Grid - All:
    maxRecords: 1000,
    view: 'Grid - All'
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.map(record => {
        let temporaryRecord = {};

        // flatten object
        temporaryRecord = {
          id: record._rawJson.id,
          ...record._rawJson.fields
        };
        temporaryPresenters.records.push(temporaryRecord);
      });

      fs.writeFile(
        './data/Presenters.json',
        JSON.stringify(temporaryPresenters),
        function(err) {
          if (err) return console.log(err);
        }
      );

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Successfully generated Presenters.json file');
    }
  );
