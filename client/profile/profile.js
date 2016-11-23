import { Session } from 'meteor/session';
import { MatchSchema } from '/imports/api/schemas.js';
import { Matches } from '/imports/api/matches.js';
import { RegisterTURs } from '/imports/api/registerTURs.js';
import { Teams } from '/imports/api/teams.js';
import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';
import { starRatingService } from 'meteor/arkham:stars-rating-ui';

import '/imports/ui/challengeModal.js';
import '/imports/ui/rateModal.js';
import '/imports/ui/changePicModal.js';
import '/imports/ui/editProfileModal.js';
import '/imports/ui/matchFragment.js';
import '/imports/ui/teamFragment.js';

import './profile.css';
import './profile.html';

Session.set("editing",false);
Session.set('fileId',undefined);
Session.set("lastShown2", "");

Meteor.subscribe('allUsers');


Template.profile.helpers({
  getUser: username =>{
    Session.set("username",username);
    Session.set('fileId',undefined);
  },

  allowed: username => {
    return username === Meteor.user().username;
  },

  canRate: username =>{
    var result = username === Meteor.user().username;
    return !result;
  },

  photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },
  sportsOptions: () => {
    return [
      {label: "Basketball", value: "basket"},
      {label: "Baseball", value: "base"}
    ];
  },

  getMatchSchema: () => {
    return MatchSchema;
  },

	registerList: function() {
		return RegisterTURs.find({userName: Session.get("username")}, {sort: {teamName: 1}}).fetch();
	},

	notShown: function(teamName) {
		if(teamName == Session.get("lastShown2")){
			return false;
		}
		return true;
	},

	alreadyShown: function(teamName) {
		Session.set("lastShown2", teamName);
	},

	show: function(teamName) {
		return Teams.findOne({name: teamName});
	},

  matchList() {
		return Matches.find({
			$or: [
				{
      		challenger: Session.get("username"),
      		status: "accepted",
				},
				{
      		challenged: Session.get("username"),
      		status: "accepted",
				}
    	]
		}).fetch();
  }
});

Template.profile.events({
  'click .change-pic':function(event, instance) {
    Modal.show('changePicModal');
  },

  'click #btn-challenge': function(event, instance) {
    Modal.show('challengeModal');
  },

  'click #btn-rate': function(event, instance){
    Modal.show('rateModal');
  },

  'click .edit-profile': function(event, instance){
    Modal.show('editProfileModal');
  }
});
