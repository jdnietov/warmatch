import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js'
import { RegisterTURs } from '/imports/api/registerTURs.js';
import { ImagesCol } from '/imports/api/images.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './team.css';
import './team.html';
import '/imports/ui/changeLogoModal.js'

Session.set("editing",false);
Session.set("teamName", "");
Session.set("fileId",undefined);

Template.team.helpers({
	team: function() {
		return Teams.findOne({name: Session.get("teamName")});
	},
	photoUrl: photo => {
    var imageId = photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },

	registerList: function() {
		return RegisterTURs.find({teamName: Session.get("teamName")});
	},

	setTeamName: function(_teamName) {
		Session.set("teamName", _teamName);
	},
	isAdmin: () => {
		return RegisterTURs.find({
			userName: Meteor.user().username,
			teamName: Session.get("teamName"),
			roleName: "Administrador"
		}).fetch().length != 0;
	},
	isMember: () => {
		return RegisterTURs.find({
			userName: Meteor.user().username,
			teamName: Session.get("teamName"),
		}).fetch().length != 0;
	},
	hasApplied: () => {
		return Teams.find({
			name: Session.get("teamName")
		}).fetch()[0].requests.length != 0;
	}
});

Template.team.events({
  'click .change-logo': function(event){
    Modal.show('changeLogoModal');
  },

	'click #btn-seeUser': function(event, instance) {
		Router.go('/profile/' + this.username);
	},

	'click #btn-apply'(event, instance) {
		console.log("applying...");
		var team = Teams.find({name: Session.get("teamName")}).fetch()[0];
		var req = team.requests;
		req.push(Meteor.user().username);

		Teams.update(team._id, {$set: {requests: req}});
	},

	'click .quit-group'(event, instance) {

	}
});

Template.userFragment.helpers({
	member: function(_userName) {
		return Meteor.users.findOne({username: _userName});
	},
	photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  }
});

Template.notifCard.helpers({
	getName: username => {
		return Meteor.users.find({username: username}).fetch()[0].profile.name;
	}
});

Template.notifCard.events({
	'click strong'(event, instance) {
		// console.log("asfdsafdsaf");
		console.log(Teams.find({
			name: Session.get("teamName")
		}).fetch()[0].requests);

		var req = Teams.find({
			name: Session.get("teamName")
		}).fetch()[0].requests;
		var idx = req.indexOf(event.target.dataset.username);
		req.splice(idx, 1);
		console.log(req);

		var team_id = Teams.find({name: Session.get("teamName")}).fetch()[0]._id;
		Teams.update(team_id, {$set: {requests: req}});
	},

	'click .req-accept'(event, instance) {
		RegisterTURs.insert({
			teamName: Session.get("teamName"),
			userName: event.target.dataset.username,
			roleName: "Jugador"
		});
	}
});
