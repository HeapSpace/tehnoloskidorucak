const fs = require('fs');
const chalk = require('chalk');

const fd = require('./scripts/fetchData');

function generateAllData() {
    const upcomingMeetupsName = 'UpcomingMeetups';
    const upcomingMeetups = require('./scripts/generate' + upcomingMeetupsName);

    fs.writeFile(
      `./data/${upcomingMeetupsName}.json`,
      JSON.stringify(upcomingMeetups),
      err => {
        if (err) return console.log(err);
        console.log(`Generated: ${chalk.yellow(upcomingMeetupsName)}.json`);
      }
    );
}

function fetchAll(callback) {
  console.log("Fetching AirTables...\n");
  fd.fetch('Presenters')
    .then(() => fd.fetch('Meetups'))
    .then(() => fd.fetch('Locations'))
    .then(() => fd.fetch('Regions'))
    .then(() => {
      console.log("\nFetching AirTables done.\n");
      callback();
    })
    .catch(err => console.log(err));
}

fetchAll(generateAllData);

// for local development
//generateAllData();