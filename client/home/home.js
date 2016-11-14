import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import './home.html';

Template.home.events({
  'click #login'(event){
    event.preventDefault();
    Router.go('/login');
  },
  'click #register'(event){
    event.preventDefault();
    Router.go('/register');
  }
});
