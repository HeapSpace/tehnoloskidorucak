const meetups = require('../../data/Meetups.json');
const presenters = require('../../data/Presenters.json');
const locations = require('../../data/Locations.json');

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
);

const locationNS = locations.records.filter(x =>
  x.fields.Meetups.includes(meetupsInNS[0].id)
);

const locationsZG = locations.records.filter(x =>
  x.fields.Meetups.includes(meetupsInZG[0].id)
);

const upcomingMeetups = {
  BEG: {
    date: meetupsInBEG[0].fields.Date,
    url: meetupsInBEG[0].fields.URL,
    presenters: presentersBEG,
    location: locationBEG
  },
  NS: {
    date: meetupsInNS[0].fields.Date,
    url: meetupsInNS[0].fields.URL,
    presenters: presentersNS,
    location: locationNS
  },
  ZG: {
    date: meetupsInZG[0].fields.Date,
    url: meetupsInZG[0].fields.URL,
    presenters: presentersZG,
    location: locationsZG
  }
};
