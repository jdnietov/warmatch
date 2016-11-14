import { Template } from 'meteor/templating';

import './navbar.css';
import './navbar.html';

Template.navbar.events({
  'click .logout'(event, instance) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
	/*
	'submit form'(event, instance) {
    event.preventDefault();
    var user = event.target.search.value;
    if(Meteor.users.findOne({username:user})) {
      Router.go('/profile/' + user);
    }
    else {
      Router.go('/profile/errorNotFound');
    }
  }*/
  'submit form'(event, instance) {
    event.preventDefault();
    Router.go('/search/' + event.target.search.value);
  }
});
