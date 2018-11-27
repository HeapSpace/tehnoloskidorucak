const fs = require('fs');
const Airtable = require('airtable');

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base('appNUbQdF6KjbUOHy');

module.exports = {
  fetch: fetch
}

function fetch(name) {
  let temporaryData = [];
  return new Promise((resolve, reject) => {
    base(name).select({
      maxRecords: 1000
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.map(record => {
          // flatten object
          temporaryData.push({
            id: record._rawJson.id,
            ...record._rawJson.fields
          });
        });

        fs.writeFile(
          `./data/${name}.json`,
          JSON.stringify(temporaryData),
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
          reject(err);
          return;
        }
        resolve();
        console.log(`Successfully fetched: ${name}.json`);
      }
    );
  });
}