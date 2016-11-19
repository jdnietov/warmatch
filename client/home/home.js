import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ImagesCol } from '/imports/api/images.js';
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
