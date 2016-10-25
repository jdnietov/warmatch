import { Template } from 'meteor/templating';

import './navbar.html';


Template.navbar.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  'click .profile': function(event){
    
  }
});
