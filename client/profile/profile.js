import { Session } from 'meteor/session';
import { MatchSchema } from '/imports/api/schemas.js';
import { Matches } from '/imports/api/matches.js';
import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';

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

  photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },

  sports: profile => {
    var sports ="";
    for(key in profile.sports){
      sports += profile.sports[key];
      sports += " ";
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
  'click .add-pic':function(event, instance) {
    Session.set("editing",true);
  },

  'change .myFileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      ImagesCol.insert(file, function (err, fileObj) {
        var fileId = fileObj._id;
        Session.set('fileId', fileId);
        console.log("algo");
      });
    });
  },

  'click .cancelar': function(event){
    Session.set("editing",false);
  },

  'click #btn-challenge': function(event, instance) {
    Modal.show('challengeModal');
  },

  'submit .imgForm':function(event, instance) {
    event.preventDefault();
    console.log("algo");
    var userId = Meteor.user()._id;
    console.log(userId);
    var img = Session.get('fileId');
    var data = Meteor.user().profile;
    data.photo=img;
    Meteor.users.update({_id:userId}, {$set: {profile: data}});
    Session.set("editing",false);
  }
});
