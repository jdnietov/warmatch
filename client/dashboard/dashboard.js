import { Template } from 'meteor/templating';

import '/imports/ui/matchFragment.js';

import './dashboard.html';

Template.dashboard.onCreated( function dashboardOnCreated() {
  if(!Meteor.userId()) {
    Router.go('/');
  }
});
