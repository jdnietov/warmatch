import './teamFragment.css';
import './teamFragment.html';

Template.teamFragment.events({
	'click #btn-seeTeam': function(event, instance) {
		Router.go('/team/' + this.name);
  }
});
