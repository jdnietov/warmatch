import { Meteor } from 'meteor/meteor';
import '/imports/api/matches.js';
import '/imports/api/open-matches.js';
import '/imports/api/teams.js';
//import { Teams } from '/imports/api/teams.js';

Meteor.startup(() => {
  Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
  });
});

/*
Meteor.publish("searchOnTeams", function(searchValue){
	if (!searchValue) {
		return Teams.find({});
	}
	return Tems.find({ $text: {$search: searchValue}});
});*/
