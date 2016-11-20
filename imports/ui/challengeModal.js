import { Template } from 'meteor/templating';
import { Matches } from '/imports/api/matches.js';

import './challengeModal.css';
import './challengeModal.html';

var random = Random.id();

Template.challengeModal.helpers({
  sportsOptions: () => {
    return [
      {label: "Basketball", value: "basket"},
      {label: "Baseball", value: "base"},
      {label: "Fútbol", value: "football"},
      {label: "Volleyball", value: "volley"}
    ];
  },

  getOpenID: () => {
    return random;
  },

  getChallengedName: () => {
    return Meteor.users.find({username: Session.get("challengedName")}).fetch()[0].profile.name;
  },

  getChallengedUsername: () => {
    return Session.get("challengedName");
  },

  getNewDate: () => {
    return new Date();
  }
});

Template.challengeModal.events({
  'submit #matchForm'(event, instance) {
    Meteor.call('matches.send-invite', Session.get("challengedName"), random);
  }
});
