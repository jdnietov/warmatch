import { Template } from 'meteor/templating';

import './profile.css';
import './profile.html';

Session.set("editing",false);

Template.profile.helpers({
  allowed: username => {
    return username===Meteor.user().username;
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
    Router.go('/createMatch');
  }
})
