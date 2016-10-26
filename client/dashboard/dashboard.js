import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import '/imports/ui/matchFragment.js';
import './dashboard.html';
Template.dashboard.events({
  'click button'(event, instance) {
    Router.go('/createMatch');
  }
});
