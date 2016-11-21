import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js'
import { RegisterTURs } from '/imports/api/registerTURs.js';
import { ImagesCol } from '/imports/api/images.js';

import './team.css';
import './team.html';

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

  isEditing: function() {
    return Session.get("editing");
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
		console.log(RegisterTURs.find({
			userName: Meteor.user().username,
			teamName: Session.get("teamName"),
		}).fetch().length != 0);
		return RegisterTURs.find({
			userName: Meteor.user().username,
			teamName: Session.get("teamName"),
		}).fetch().length != 0;
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

Template.team.events({
  'click .añadir-logo': function(event){
    Session.set("editing",true);
  },

	'change .myFileInput': function(event, template) {
    if(Session.get('fileId')){
      ImagesCol.remove({_id:Session.get('fileId')}, true);
    }
    FS.Utility.eachFile(event, function(file) {
      ImagesCol.insert(file, function (err, fileObj) {
        var fileId = fileObj._id;
        Session.set('fileId', fileId);
      });
    });
  },

	'submit .imgForm':function(event, instance) {
    event.preventDefault();
    var name = Session.get("teamName");
		var team = Teams.findOne({name:name});
    var img = Session.get('fileId');
    if(img){
	    ImagesCol.remove({_id:team.logo}, true);
	    Teams.update({_id:team._id}, {$set: {logo: img}});
    }
    Session.set("editing",false);
  },

  'click .cancelar': function(event){
    Session.set("editing",false);
  },

	'click #btn-seeUser': function(event, instance) {
		Router.go('/profile/' + this.username);
	}
});
