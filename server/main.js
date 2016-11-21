import { Meteor } from 'meteor/meteor';
import '/imports/api/matches.js';
import '/imports/api/open-matches.js';
import '/imports/api/teams.js';
import '/imports/api/registerTURs.js';
//import { Teams } from '/imports/api/teams.js';
import '/imports/api/ratings.js';

Meteor.startup(() => {
  Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
  });
});
