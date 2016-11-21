import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Matches } from '/imports/api/matches.js';
import { OpenMatches } from '/imports/api/open-matches.js';
import { RegisterTURs } from '/imports/api/registerTURs.js';
import { Teams } from '/imports/api/teams.js';
import { ReactiveVar } from 'meteor/reactive-var';

import '/imports/ui/openMatchModal.js';
import '/imports/ui/matchFragment.js';
import '/imports/ui/teamFragment.js';

import './dashboard.css';
import './dashboard.html';
Session.set('fileId',undefined);


Session.set("lastShown", "");

Template.dashboard.helpers({
  matchList() {
    return OpenMatches.find({}, {sort: {createdAt: -1}});
  },

	registerList: function() {
		return RegisterTURs.find({userName: Meteor.user().username}, {sort: {teamName: 1}});
	},

	notShown: function(teamName) {
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
	},

  confirmedRequests: () => {
    return Matches.find({
      challenger: Meteor.user().username,
      status: {$not: "pending"},
      confirmed: false
    }).fetch();
  }
});

Template.dashboard.events({
  'click #btn-createMatch': function(event, instance) {
    Modal.show('openMatchModal');
  }
});

Template.notificationCard.onCreated(function() {
  this.match_id = new ReactiveVar("");
})

Template.notificationCard.helpers({
  challengerName: request => {
    return Meteor.users.find({username: request.challenged}).fetch()[0].profile.name;
  },

  notifStatus: request => {
    var status = request.status;
    if(status == "accepted") {
      return "aceptado";
    }
    return "rechazado";
  },

  matchId: request => {
    Template.instance().match_id.set(request._id);
    console.log(Template.instance().match_id.get());
    return request._id;
  }
});

Template.notificationCard.events({
  'click .glyphicon.glyphicon-remove'(event, instance) {
    Matches.update(instance.match_id.get(), {$set: {confirmed: true}});
  }
});
