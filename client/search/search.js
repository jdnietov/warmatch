import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';

import './search.css';
import './search.html';

Template.search.helpers({

	teamList: function(searchValue) {
		return Teams.find({$or: [{name: searchValue},{sport: searchValue}]});
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
