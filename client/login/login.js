import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './login.html';

Template.login.events({
  'submit form'(event, instance) {
    event.preventDefault();
    const target = event.target;
    var username = target.username.value;
    var password = target.password.value;

    Meteor.loginWithPassword(username,password,function(error){
      if(error){
        window.alert(error.reason);
      }
      else{
        Router.go('/');
      }
    });
  }
});
