import { Session } from 'meteor/session';
import { MatchSchema } from '/imports/api/schemas.js';
import { Matches } from '/imports/api/matches.js';
import { Template } from 'meteor/templating';

import '/imports/ui/challengeModal.js';

import './profile.css';
import './profile.html';

Session.set("editing",false);

Template.profile.helpers({
  allowed: username => {
    return username === Meteor.user().username;
  },

  isEditing: () => {
    return Session.get("editing");
  },

  sports: profile => {
    var sports ="";
    if(profile.football){
      sports += "Fútbol ";
    }
    if(profile.basketball){
      sports += "Basquetball ";
    }
    if(profile.baseball){
      sports += "Baseball ";
    }
    if(profile.volleyball){
      sports += "Volleyball ";
    }
    if(profile.tenis){
      sports += "Tenis";
    }
    return sports;
  },

  sportsOptions: () => {
    return [
        {label: "Basketball", value: "basket"},
        {label: "Baseball", value: "base"}
    ];
  },

  getMatchSchema: () => {
    return MatchSchema;
  }
});

Template.profile.events({
  'click .add-pic'(event, instance) {
    Session.set("editing",true);
  },

  'click .save-pic'(event, instance) {
    var userId = Meteor.user()._id;
    var img = $('#img_src').val()
    var data = Meteor.user().profile;
    data.foto = img;
    Meteor.users.update({_id:userId}, {$set: {profile: data}});
    Session.set("editing",false);
  },

  'click .cancelar': function(event){
    Session.set("editing",false);
  },

  'click #btn-challenge'(event, instance) {
    Modal.show('challengeModal');
  },

  'submit #img-form'(event, instance) {
    event.preventDefault();
    console.log("img submitted");
  }
});
