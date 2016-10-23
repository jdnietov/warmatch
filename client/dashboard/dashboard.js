import { Template } from 'meteor/templating';

import '/imports/ui/matchFragment.js';

import './dashboard.html';

Tracker.autorun (function() {
  if(!Meteor.userId()) {
    Router.go('/');
  }
});
