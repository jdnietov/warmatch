import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';

import './createTeam.css';
import './createTeam.html';

Template.createTeam.events({
  'submit form'(event, instance) {
    event.preventDefault();

    const target = event.target;

    const _name = target.name.value;
		const _description = target.description.value
    const _sport = target.sport.value;
		const _logo = target.logo.value;
		const _statistics = [];

		console.log(_name);
		console.log(_description);
		console.log(_sport);
		console.log(_logo);
		console.log(_statistics);

    Teams.insert({
      name: _name,
			description: _description,
      sport: _sport,
			logo: _logo,
			statistics: _statistics
    });

    console.log("Inserted!");
    Router.go('/')
  }
});
