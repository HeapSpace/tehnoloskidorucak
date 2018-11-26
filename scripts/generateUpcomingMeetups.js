const meetups = require('../data/Meetups.json');
const presenters = require('../data/Presenters.json');
const locations = require('../data/Locations.json');

// Sorted meetups from newest to oldest;
const sortedMeetups = meetups.records.sort(function(a, b) {
  a = new Date(a.fields.Date);
  b = new Date(b.fields.Date);
  return a > b ? -1 : a < b ? 1 : 0;
});

// Collect regions from locations
const regions = [];
locations.records.forEach(r => {
  regions.push(r.fields.Region);
});

// Filter out meetups by cities
const meetupsIn = {};
regions.forEach(r => {
  meetupsIn[r] = sortedMeetups.filter(x => x.fields.Region.includes(r));
});

// Match upcoming meetups with presenters
const presentersIn = {};
regions.forEach(r => {
  presentersIn[r] = presenters.records.filter(x =>
    x.fields.Meetup.includes(meetupsIn[r][0].id)
  );
});

// Match locations with regions
const locationsIn = {};
regions.forEach(r => {
  locationsIn[r] = locations.records.filter(x =>
    x.fields.Meetups.includes(meetupsIn[r][0].id)
  )[0].fields['Display name'];
});

// Build resulting object
const upcomingMeetups = {};
regions.forEach(r => {
  upcomingMeetups[r] = {
    date: formatDate(meetupsIn[r][0].fields.Date),
    url: meetupsIn[r][0].fields.URL || '#',
    presenters: sortAlphabetically(presentersIn[r]),
    location: locationsIn[r]
  }
});

module.exports = upcomingMeetups;

function sortAlphabetically(array) {
  return array.sort(function(a, b) {
    b = b.fields.Name.toUpperCase();
    a = a.fields.Name.toUpperCase();
    return a > b ? 1 : a < b ? -1 : 0;
  });
}

// Format date: '2018-12-05' -> 5.12.
function formatDate(date) {
  const dateParts = date.split('-');
  const month = Number(dateParts[1]);
  const day = Number(dateParts[2]);
  return `${day}.${month}.`;
}
