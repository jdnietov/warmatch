import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ImagesCol } from '/imports/api/images.js';
import './home.html';
import '/client/register/register.js';

Template.home.events({
  'click #register'(event){
    event.preventDefault();
    Router.go('/register');
  }
});
