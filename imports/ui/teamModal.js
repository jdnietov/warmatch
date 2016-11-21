import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { RegisterTURs } from '/imports/api/registerTURs';

import './teamModal.css';
import './teamModal.html';

Template.teamModal.helpers({
	statisticsList: function(){
		return [
			{name: "Partidos jugados", value: 0},
			{name: "Partidos ganados", value: 0},
			{name: "Partidos perdidos", value: 0},
			{name: "Partidos empatados", value: 0}
		];
	},
  sportsOptions: () => {
    return [
      {label: "Basketball", value: "basket"},
      {label: "Baseball", value: "base"},
      {label: "Fútbol", value: "football"},
      {label: "Volleyball", value: "volley"}
    ];
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
