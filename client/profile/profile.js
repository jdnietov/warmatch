import { Session } from 'meteor/session';
import { MatchSchema } from '/imports/api/schemas.js';
import { Matches } from '/imports/api/matches.js';

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

  deportes: profile => {
    var deportes ="";
    // if(profile.futbol){
    //   deportes += "Futbol ";
    // }
    if(profile.basquetball){
      deportes += "Basquetball ";
    }
    if(profile.baseball){
      deportes += "Baseball ";
    }
    if(profile.volleyball){
      deportes += "Volleyball ";
    }
    if(profile.tenis){
      deportes += "Tenis";
    }
    return deportes;
  },

  sportsOptions: () => {
    return [
        {label: "2013", value: "2013"},
        {label: "2014", value: "2014"},
        {label: "2015", value: "2015"}
    ];
  },

  getMatchSchema: () => {
    return MatchSchema;
  },

  getProfileUsername: user => {
    console.log(user);
    console.log(Meteor.user().username);
    return "jugador";
  }
});

Template.profile.events({
  'click .añadir-foto': function(event){
    Session.set("editing",true);
  },

  'click .guardar-foto': function(event){
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
