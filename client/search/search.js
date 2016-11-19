import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';

import './search.css';
import './search.html';

Meteor.subscribe('allUsers');


Template.search.helpers({

	teamList: function(val){
		var regEx = ".*"+val+".*";
		var query = Teams.find({$or: [{name: {$regex : regEx, $options: 'i'}},{sport:{$regex : regEx, $options: 'i'}}]}).fetch();
		return query;

	},
	profileList: function(val){
		var regEx = ".*"+val+".*";
		var query = Meteor.users.find({$or: [{"profile.name": {$regex : regEx, $options: 'i'}},{"profile.apellido":{$regex : regEx, $options: 'i'}},{username: {$regex : regEx, $options: 'i'}}]}).fetch();
		return query;
	},
	/*
	teamList: function(searchValue) {
		//Teams.subscribe("searchOnTemas", searchValue);
		//return Teams.find({});
	},*/
	logear: function(mensaje) {
		console.log(mensaje);
	}
});
