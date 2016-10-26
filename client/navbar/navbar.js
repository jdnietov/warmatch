import { Template } from 'meteor/templating';

import './navbar.css';
import './navbar.html';

Template.navbar.events({
  'click .logout'(event, instance) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  'submit form'(event, instance) {
    event.preventDefault();
    var user = $('[id=search]').val();
    Router.go('/profile/'+$('[id=search]').val());
  }
});
