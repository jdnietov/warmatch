import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import userRedirect from '/imports/accounts/redirect.js';

import '/imports/ui/matchFragment.js';
import './home.html';

Template.home.onCreated(function homeOnCreated() {
  Tracker.autorun(function() {
    userRedirect('home');
  });
});
