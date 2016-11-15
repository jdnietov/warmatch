import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js'
import { RegisterTURs } from '/imports/api/registerTURs.js';

import './team.css';
import './team.html';

Session.set("editing",false);
var equipoABuscar = "equipo1";



Template.team.helpers({
	team: function() {
		return Teams.findOne({name: equipoABuscar});
	},

  isEditing: function() {
    return Session.get("editing");
  },

	registerList: function() {
		return RegisterTURs.find({teamName: equipoABuscar});
	},

	member: function(_userName) {
		return Meteor.users.findOne({username: _userName});
	}
});

Template.team.events({
  'click .añadir-logo': function(event){
    Session.set("editing",true);
  },

  'click .guardar-logo': function(event){
    var log = $('#log_src').val();
		Teams.update({_id: this._id}, {$set: {logo: log}});
    Session.set("editing",false);
  },

  'click .cancelar': function(event){
    Session.set("editing",false);
  },
});
