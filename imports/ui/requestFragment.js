import { Template } from 'meteor/templating';
import { Matches } from '/imports/api/matches.js';
import { ImagesCol } from '/imports/api/images.js';

import './requestFragment.css';
import './requestFragment.html';

var match = {};

Template.requestFragment.helpers({
  fetchRequestInfo: request  => {
    match = request;
  },

  name: request => {
    return Meteor.users.find({username: match.challenger}).fetch()[0].profile.name;
  },

  place: request => {
    return match.place;
  },

  date: request => {
    return match.date;
  },

  message: request => {
    return match.message;
  },

  photoUrl: request => {
    var user = Meteor.users.find({username: match.challenger}).fetch()[0];
    var imageId = user.profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  }
});

Template.requestFragment.events({
  'click #btn-accept'(event, instance) {
    Matches.update(match._id, {$set: {status: "accepted"}});
  },

  'click #btn-reject'(event, instance) {
    Matches.update(match._id, {$set: {status: "rejected"}});
  }
});
