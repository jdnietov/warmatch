import { Template } from 'meteor/templating';
import { Matches } from '/imports/api/matches.js';

import './challengeModal.css';
import './challengeModal.html';

Session.set("random-id", Random.id());

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
    return Session.get("random-id");
  },

  getChallengedName: () => {
    return Meteor.users.find({username: Session.get("challengedName")}).fetch()[0].profile.name;
  },

  getNewDate: () => {
    return new Date();
  }
});

Template.challengeModal.events({
  'submit #matchForm'(event, instance) {
    // TODO this approach is horrible. Use midway relational collection
    Meteor.call('matches.send-invite', Session.get("challengedName"), Session.get("random-id"));
  }
});
