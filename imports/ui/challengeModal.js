import { Template } from 'meteor/templating';
import { Matches } from '/imports/api/matches.js';

import './challengeModal.css';
import './challengeModal.html';

Template.challengeModal.helpers({
  sportsOptions: () => {
    return [
      {label: "Basketball", value: "basket"},
      {label: "Baseball", value: "base"},
      {label: "Fútbol", value: "football"},
      {label: "Volleyball", value: "volley"}
    ];
  },

  getChallengedName: () => {
    return Session.get("challengedName");
  }
});
