import { Meteor } from 'meteor/meteor';
import '/imports/api/matches.js';
import '/imports/api/open-matches.js';
import '/imports/api/teams.js';
//import { Teams } from '/imports/api/teams.js';

Meteor.startup(() => {
  // code to run on server at startup
});

/*
Meteor.publish("searchOnTeams", function(searchValue){
	if (!searchValue) {
		return Teams.find({});
	}
	return Tems.find({ $text: {$search: searchValue}});
});*/
