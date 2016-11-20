import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';
import { Matches } from '/imports/api/matches.js';

import './navbar.css';
import './navbar.html';

Template.navbar.helpers({
  photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },
  invites: () => {
    return Meteor.user().profile.matchRequests.length;
  },
  getRequests: () => {
    return Meteor.user().profile.matchRequests;
  }
});

Template.navbar.events({
  'click .logout'(event, instance) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  'submit form'(event, instance) {
    if(event.target.id=="searchbox"){
      event.preventDefault();
      Router.go('/search/' + event.target.search.value.toLowerCase());
    }
    else if(event.target.id=="login"){
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
  }
});

Template.requestInfo.helpers({
  getRequestInfo: request  => {
    return Matches.find({_id: request}).fetch()[0].challenger;
  }
});
