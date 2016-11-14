import { Template } from 'meteor/templating';
import { OpenMatches } from '/imports/api/open-matches.js';

import './openMatchModal.css';
import './openMatchModal.html';

Template.openMatchModal.helpers({
  sportsOptions: () => {
    return [
      {label: "Basketball", value: "basket"},
      {label: "Baseball", value: "base"},
      {label: "Fútbol", value: "football"},
      {label: "Volleyball", value: "volley"}
    ];
  }
});
