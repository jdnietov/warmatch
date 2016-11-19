import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { RegisterTURs } from '/imports/api/registerTURs.js';

import './createTeam.css';
import './createTeam.html';

Template.createTeam.events({
  'submit form'(event, instance) {
    event.preventDefault();

    const target = event.target;

    Teams.insert({
      name: target.name.value,
			description: target.description.value,
      sport: target.sport.value,
			logo: target.logo.value,
			statistics: [
				{name: "Partidos jugados", value: 0},
				{name: "Partidos ganados", value: 0},
				{name: "Partidos perdidos", value: 0},
				{name: "Partidos empatados", value: 0}
			]
    });
		console.log("Team "+target.name.value+" inserted!");

		RegisterTURs.insert({
			teamName: target.name.value,
			userName: Meteor.user().username,
			roleName: "Administrador"
		})
    console.log("RegisterTURs Inserted!");

    Router.go('/')
  }
});
