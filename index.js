const fs = require('fs');

const upcomingMeetups = require('./scripts/generateUpcomingMeetups');

// generate upcomingMeetups.json from formated data
fs.writeFile(
  './data/UpcomingMeetups.json',
  JSON.stringify(upcomingMeetups),
  function(err) {
    if (err) return console.log(err);
    console.log('Successfully generated upcomingMeetups.json file');
  }
);
