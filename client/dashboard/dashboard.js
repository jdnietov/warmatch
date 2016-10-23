import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import userRedirect from '/imports/accounts/redirect.js';

import '/imports/ui/matchFragment.js';
import './dashboard.html';

Template.dashboard.onCreated( function dashboardOnCreated() {
  Tracker.autorun(function() {
    userRedirect('dashboard');
  });
});

Template.dashboard.events({
  'click button'(event, instance) {
    Router.go('/createMatch');
  }
});
