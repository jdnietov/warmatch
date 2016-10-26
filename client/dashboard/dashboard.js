import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import { OpenMatches } from '/imports/api/open-matches.js';
import '/imports/ui/matchFragment.js';

import './dashboard.css';
import './dashboard.html';

Template.dashboard.helpers({
  matchList() {
    return OpenMatches.find({});
  },
});

Template.dashboard.events({
  'click button'(event, instance) {
    Router.go('/createMatch');
  }
});
