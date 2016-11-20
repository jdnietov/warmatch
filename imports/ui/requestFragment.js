import { Template } from 'meteor/templating';
import { Matches } from '/imports/api/matches.js';
import { ImagesCol } from '/imports/api/images.js';

import './requestFragment.css';
import './requestFragment.html';

var match = {};

Template.requestFragment.helpers({
  fetchRequestInfo: request  => {
    match = Matches.find({_id: request}).fetch()[0];
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
    var imageId = Meteor.users.find({username: match.challenger}).fetch()[0].profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    console.log(image);
    return image;
  }
});
