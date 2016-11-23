import { Session } from 'meteor/session';
import { MatchSchema } from '/imports/api/schemas.js';
import { Matches } from '/imports/api/matches.js';
import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';
import { starRatingService } from 'meteor/arkham:stars-rating-ui';

import '/imports/ui/challengeModal.js';
import '/imports/ui/rateModal.js';

import './profile.css';
import './profile.html';

Session.set("editing",false);
Session.set('fileId',undefined);

Meteor.subscribe('allUsers');

Template.profile.helpers({
  getUser: username =>{
    Session.set("username",username);
    Session.set('fileId',undefined);
  },

  allowed: username => {
    return username === Meteor.user().username;
  },

  canRate: username =>{
    var result = username === Meteor.user().username;
    return !result;
  },

  isEditing: () => {
    return Session.get("editing");
  },

  photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
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
    if(Session.get('fileId')){
      ImagesCol.remove({_id:Session.get('fileId')}, true);
    }
    FS.Utility.eachFile(event, function(file) {
      ImagesCol.insert(file, function (err, fileObj) {
        var fileId = fileObj._id;
        Session.set('fileId', fileId);
      });
    });
  },

  'click .cancelar': function(event){
    event.preventDefault();
    Session.set("editing",false);
  },

  'click #btn-challenge': function(event, instance) {
    Modal.show('challengeModal');
  },

  'click #btn-rate': function(event, instance){
    Modal.show('rateModal');
  },

  'submit .imgForm':function(event, instance) {
    event.preventDefault();
    var userId = Meteor.user()._id;
    var img = Session.get('fileId');
    if(img){
      var data = Meteor.user().profile;
      ImagesCol.remove({_id:data.photo}, true);
      data.photo=img;
      Meteor.users.update({_id:userId}, {$set: {profile: data}});
    }
    Session.set("editing",false);
  }

});
