const fs = require('fs');

const fd = require('./scripts/fetchData');

fd.fetch('Presenters')
  .then(() => fd.fetch('Meetups'))
  .then(() => fd.fetch('Locations'))
  .then(() => {
    console.log("Fetching AirTables done.");

    const upcomingMeetupsName = 'UpcomingMeetups';
    const upcomingMeetups = require('./scripts/generate' + upcomingMeetupsName);

    fs.writeFile(
      `./data/${upcomingMeetupsName}.json`,
      JSON.stringify(upcomingMeetups),
      err => {
        if (err) return console.log(err);
        console.log(`Successfully generated: ${upcomingMeetupsName}.json`);
      }
    );
  })
  .catch(err => console.log(err));
