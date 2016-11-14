import { Template } from 'meteor/templating';
import { OpenMatches } from '/imports/api/open-matches.js';

import '/imports/ui/openMatchModal.js';
import '/imports/ui/matchFragment.js';

import './dashboard.css';
import './dashboard.html';

Template.dashboard.helpers({
  matchList() {
    return OpenMatches.find({}, {sort: {createdAt: 1}});
  },
});

Template.dashboard.events({
  'click button'(event, instance) {
    Modal.show('openMatchModal');
  }
});
