import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { RegisterTURs } from '/imports/api/registerTURs';

import './teamModal.css';
import './teamModal.html';

Template.teamModal.helpers({
	statisticsList: function(){
		var ret = [
			{name: "Partidos jugados", value: 0},
			{name: "Partidos ganados", value: 0},
			{name: "Partidos perdidos", value: 0},
			{name: "Partidos empatados", value: 0}
		];
		console.log(ret);
		return ret;
	},
  sportsOptions: () => {
		var ret = [
			{label: "Fútbol", value: "Fútbol"},
			{label: "Baloncesto", value: "Baloncesto"},
			{label: "Béisbol", value: "Béisbol"},
			{label: "Vóleibol", value: "Vóleibol"}
		];
		console.log(ret);
    return ret;
  }
});

Template.teamModal.events({
	'submit #teamForm'(event, instance) {
			const target = event.target;
			console.log(target.name.value);
			RegisterTURs.insert({
				teamName: target.name.value,
				userName: Meteor.user().username,
				roleName: "Administrador"
			})
	    console.log("RegisterTURs Inserted!");
  }
});
