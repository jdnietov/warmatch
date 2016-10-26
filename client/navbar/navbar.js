import { Template } from 'meteor/templating';


import './navbar.html';


Template.navbar.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  'submit form': function(event){
    event.preventDefault();
    var user = $('[id=search]').val();
    Router.go('/profile/'+$('[id=search]').val());
  }
});
