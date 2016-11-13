import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';


Template.createTeam.events({
  'submit form'(event, instance) {
    event.preventDefault();
    const target = event.target;

    const _name = target.name.value;
		const _description = target.description.value
    const _sport = target.sport.value;
		const _logo = "/img/bskt.jpg";

    Teams.insert({
      name: _name,
			description: _description,
      sport: _sport,
			logo: _logo
    });

    console.log("Inserted!");
    Router.go('/')
  }
});
