const fs = require('fs');

const meetups = require('./Meetups.json');
const presenters = require('./Presenters.json');
const locations = require('./Locations.json');

// Sorted meetups from newest to oldest;
const sortedMeetups = meetups.records.sort(function(a, b) {
  a = new Date(a.fields.Date);
  b = new Date(b.fields.Date);
  return a > b ? -1 : a < b ? 1 : 0;
});

// Filter out meetups by cities;
const meetupsInBEG = sortedMeetups.filter(x => x.fields.Region.includes('BEG'));
const meetupsInNS = sortedMeetups.filter(x => x.fields.Region.includes('NS'));
const meetupsInZG = sortedMeetups.filter(x => x.fields.Region.includes('ZG'));

// Match upcoming meetups with presenters
const presentersBEG = presenters.records.filter(x =>
  x.fields.Meetup.includes(meetupsInBEG[0].id)
);

const presentersNS = presenters.records.filter(x =>
  x.fields.Meetup.includes(meetupsInNS[0].id)
);

const presentersZG = presenters.records.filter(x =>
  x.fields.Meetup.includes(meetupsInZG[0].id)
);

// Match locations with regions
const locationBEG = locations.records.filter(x =>
  x.fields.Meetups.includes(meetupsInBEG[0].id)
)[0].fields.Name;

const locationNS = locations.records.filter(x =>
  x.fields.Meetups.includes(meetupsInNS[0].id)
)[0].fields.Name;

const locationZG = locations.records.filter(x =>
  x.fields.Meetups.includes(meetupsInZG[0].id)
)[0].fields.Name;

console.log(locationBEG);

const upcomingMeetups = {
  BEG: {
    date: meetupsInBEG[0].fields.Date,
    url: meetupsInBEG[0].fields.URL,
    presenters: sortAlphabetically(presentersBEG),
    location: locationBEG
  },
  NS: {
    date: meetupsInNS[0].fields.Date,
    url: meetupsInNS[0].fields.URL,
    presenters: sortAlphabetically(presentersNS),
    location: locationNS
  },
  ZG: {
    date: meetupsInZG[0].fields.Date,
    url: meetupsInZG[0].fields.URL,
    presenters: sortAlphabetically(presentersZG),
    location: locationZG
  }
};

// generate upcomingMeetups.json from formated data
fs.writeFile(
  './data/upcomingMeetups.json',
  JSON.stringify(upcomingMeetups),
  function(err) {
    if (err) return console.log(err);
    console.log('Successfully generated upcomingMeetups.json file');
  }
);

function sortAlphabetically(array) {
  return array.sort(function(a, b) {
    b = b.fields.Name.toUpperCase();
    a = a.fields.Name.toUpperCase();
    return a > b ? 1 : a < b ? -1 : 0;
  });
}
