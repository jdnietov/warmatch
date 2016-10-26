import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './login.html';

Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(username,password);
    Router.go('/');
  }
});
