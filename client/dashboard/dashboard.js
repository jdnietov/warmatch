import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { OpenMatches } from '/imports/api/open-matches.js';
import { RegisterTURs } from '/imports/api/registerTURs.js';
import { Teams } from '/imports/api/teams.js';

import '/imports/ui/openMatchModal.js';
import '/imports/ui/matchFragment.js';
//import '/imports/ui/teamFragment.js';

import './dashboard.css';
import './dashboard.html';


Session.set("lastShown", "");

Template.dashboard.helpers({
  matchList() {
    return OpenMatches.find({}, {sort: {createdAt: -1}});
  },

	registerList: function() {
		return RegisterTURs.find({userName: Meteor.user().username}, {sort: {teamName: 1}});
	},

	notShown: function(teamName) {
		console.log(Session.get("lastShown"));
		if(teamName == Session.get("lastShown")){
			return false;
		}
		return true;
	},

	alreadyShown: function(teamName) {
		Session.set("lastShown", teamName);
	},

	show: function(teamName) {
		return Teams.findOne({name: teamName});
	}
});

Template.dashboard.events({
  'click button'(event, instance) {
    Modal.show('openMatchModal');
  }
});
