import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';
import { Teams } from '/imports/api/teams.js';
import { Matches } from '/imports/api/matches.js';
import { RegisterTURs } from '/imports/api/registerTURs.js';

import '/imports/ui/requestFragment.js';

import './navbar.css';
import './navbar.html';

Meteor.subscribe('allUsers');

Template.navbar.onCreated(
  function(){
    this.Auxlog = new ReactiveVar("");
    this.Auxregist = new ReactiveVar("");
    this.Auxabout = new ReactiveVar("");
  }
);

Template.navbar.helpers({
  photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },
  invites: () => {
    return Match.find({
      challenged: Meteor.user().username,
      status: "pending"
    }).fetch().length;
  },
  userList: function(){
    var val = Session.get("search");
    if(val && val.length>0)var regExx = "^"+val;
    else var regExx = ".*";
    var query = Meteor.users.find({
      $or: [{
        "profile.name": {
          $regex : regExx,
          $options: 'i'
      }}, {
        "profile.apellido": {
          $regex : regExx,
          $options: 'i'
        }},{
          username: {
            $regex : regExx,
            $options: 'i'
    }}]}).fetch();
    return query;
  },
  focus: function(){
    return Session.get("focus");
  },
  getRequests: () => {
    return Match.find({
      challenged: Meteor.user().username,
      status: "pending"
    }).fetch();
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
      var query = event.target.search.value.toLowerCase();
      if(query.length>0){
        Router.go('/explore/' + event.target.search.value.toLowerCase());
      }
      else{
        Router.go('/explore/%noquery%');
      }

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
  },
  'keyup #searchbox': function(event){
    Session.set("search",event.target.value);
  },
  'focus #searchbox': function(event){
    Session.set("focus",true);
  },
  'blur #searchbox': function(event){
    Session.set("focus",false);
  }
});
