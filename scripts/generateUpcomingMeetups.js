const meetups = require('../data/Meetups.json');
const presenters = require('../data/Presenters.json');
const locations = require('../data/Locations.json');

// Sorted meetups from newest to oldest;
const sortedMeetups = meetups.sort(function(a, b) {
  a = new Date(a.Date);
  b = new Date(b.Date);
  return a > b ? -1 : a < b ? 1 : 0;
});

// Collect regions from locations
const regions = [];
locations.forEach(r => {
  if (regions.includes(r.Region) === false) {
    regions.push(r.Region);
  }
});

// Filter out meetups by regions
const meetupsIn = {};
regions.forEach(r => {
  meetupsIn[r] = sortedMeetups.filter(x => x.Region.includes(r));
});

// Match upcoming meetups with presenters
const presentersIn = {};
regions.forEach(r => {
  presentersIn[r] = presenters.filter(x =>
    x.Meetup.includes(meetupsIn[r][0]._id)
  );
});

// Match locations with regions
const locationsIn = {};
regions.forEach(r => {
  locationsIn[r] = locations.filter(x =>
    x.Meetups.includes(meetupsIn[r][0]._id)
  )[0]['Display name'];
});

// Build resulting object
const upcomingMeetups = {};
regions.forEach(r => {
  upcomingMeetups[r] = {
    date: formatDate(meetupsIn[r][0].Date),
    url: meetupsIn[r][0].URL || '#',
    presenters: sortAlphabetically(presentersIn[r]),
    location: locationsIn[r]
  }
});

module.exports = upcomingMeetups;

function sortAlphabetically(array) {
  return array.sort(function(a, b) {
    b = b.Name.toUpperCase();
    a = a.Name.toUpperCase();
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
