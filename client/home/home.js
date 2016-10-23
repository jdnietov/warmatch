import { Template } from 'meteor/templating';

import '/imports/ui/matchFragment.js';
// import './imports/ui/match-fragment.html';
import './home.html';

Tracker.autorun (function() {
  if(Meteor.userId()) {
    Router.go('/dashboard');
  }
});
