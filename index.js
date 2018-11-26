const fs = require('fs');

const upcomingMeetupsName = 'UpcomingMeetups';
const upcomingMeetups = require('./scripts/generate' + upcomingMeetupsName);

fs.writeFile(
  `./data/${upcomingMeetupsName}.json`,
  JSON.stringify(upcomingMeetups),
  function(err) {
    if (err) return console.log(err);
    console.log(`Successfully generated ${upcomingMeetupsName}.json file`);
  }
);
