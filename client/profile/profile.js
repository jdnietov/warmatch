import { Session } from 'meteor/session';
import { MatchSchema } from '/imports/api/schemas.js';
import { Matches } from '/imports/api/matches.js';
import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';
import { Ratings } from '/imports/api/ratings.js';

import '/imports/ui/challengeModal.js';

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

  getRating: ()=>{
    var data = Ratings.findOne({username:Session.get("username")});
    return data;
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

  'click #stars': function(event){
    var username = Meteor.user().username;
    var stars = $('#stars').data('userrating');
    var data = Ratings.findOne({username:Session.get("username")});
    var already = false;
    var ratings = data.rates;
    var mean = parseFloat(data.mean);
    for(var i=0; i<ratings.length; i++){
      if(ratings[i].includes(username)){
        already = true;
        var temp = ratings[i].split("&");
        ratings[i] = temp[0]+"&"+stars;
        console.log(temp);
        mean = mean - parseFloat(temp[1])/ratings.length;
        mean = mean + parseFloat(stars)/ratings.length;
        break;
      }
    }
    if(!already){
      ratings.push(username+"&"+stars);
      mean = mean + parseFloat(stars)/ratings.length;
    }
    console.log(mean);
    Ratings.update({_id:data._id}, {$set: {rates: ratings , mean: mean}});
  },

  'click .cancelar': function(event){
    event.preventDefault();
    Session.set("editing",false);
  },

  'click #btn-challenge': function(event, instance) {
    Modal.show('challengeModal');
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
