const meetups = require('../data/Meetups.json');
const presenters = require('../data/Presenters.json');
const locations = require('../data/Locations.json');
const regions = require('../data/Regions.json');

// Sorted meetups from newest to oldest;
const sortedMeetups = meetups.sort(function(a, b) {
  a = new Date(a.Date);
  b = new Date(b.Date);
  return a > b ? -1 : a < b ? 1 : 0;
});

// Filter out meetups by regions
const meetupsIn = {};
regions.forEach(r => {
  meetupsIn[r.Name] = sortedMeetups.filter(x => x.Region.includes(r._id));
});

// Match upcoming meetups with presenters
const presentersIn = {};
regions.forEach(r => {
  presentersIn[r.Name] = presenters.filter(x =>
    x.Meetup.includes(meetupsIn[r.Name][0]._id)
  );
});

// Match locations with regions
const locationsIn = {};
regions.forEach(r => {
  locationsIn[r.Name] = locations.filter(x =>
    x.Meetups.includes(meetupsIn[r.Name][0]._id)
  )[0]['DisplayName'];
});

// Build resulting object
const upcomingMeetups = {};
regions.forEach(r => {
  upcomingMeetups[r.Name] = {
    date: formatDate(meetupsIn[r.Name][0].Date),
    url: meetupsIn[r.Name][0].URL || '#',
    location: locationsIn[r.Name],
    presenters: sortAlphabetically(presentersIn[r.Name]),
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
