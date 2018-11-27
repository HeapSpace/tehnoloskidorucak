const fs = require('fs');

const fd = require('./scripts/fetchData');

fd.fetch('Presenters')
	.then(function() {return fd.fetch('Meetups');})
	.then(function() {return fd.fetch('Locations');})
	.then(function() {
		console.log("Fetching AirTables done.");

		const upcomingMeetupsName = 'UpcomingMeetups';
		const upcomingMeetups = require('./scripts/generate' + upcomingMeetupsName);

		fs.writeFile(
		  `./data/${upcomingMeetupsName}.json`,
		  JSON.stringify(upcomingMeetups),
		  function(err) {
		    if (err) return console.log(err);
		    console.log(`Successfully generated: ${upcomingMeetupsName}.json`);
		  }
		);
	})
	.catch(function(err) {
		console.log(err);
	});
