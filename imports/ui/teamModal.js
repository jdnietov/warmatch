import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';

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
	'click #createTeam': function(event, instance){
    const target = event.target;
		console.log(taget.name.value);
	},
	'submit #teamForm'(event, instance) {
		Teams.insert({
      name: target.name.value,
			description: target.description.value,
      sport: target.sport.value,
			logo: Session.get("fileId"),
			statistics: [
				{name: "Partidos jugados", value: 0},
				{name: "Partidos ganados", value: 0},
				{name: "Partidos perdidos", value: 0},
				{name: "Partidos empatados", value: 0}
			]
    });
  }
});
