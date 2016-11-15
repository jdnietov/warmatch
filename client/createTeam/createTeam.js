import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { RegisterTURs } from '/imports/api/registerTURs.js';

import './createTeam.css';
import './createTeam.html';

Template.createTeam.events({
  'submit form'(event, instance) {
    event.preventDefault();

    const target = event.target;
/*
    const _name = target.name.value;
		const _description = target.description.value
    const _sport = target.sport.value;
		const _logo = target.logo.value;
		const _statistics = [];

		console.log(_name);
		console.log(_description);
		console.log(_sport);
		console.log(_logo);
		console.log(_statistics);*/

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

		/*
		console.log("new RegisterTURs add");
		console.log("teamName: "+target.name.value);
		console.log("userName: "+Meteor.user().username);
		console.log("roleName: "+"Administrator");
		*/


		RegisterTURs.insert({
			teamName: target.name.value,
			userName: Meteor.user().username,
			roleName: "Administrador"
		})

    console.log("Inserted!");
    Router.go('/')
  }
});
