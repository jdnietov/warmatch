import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import userRedirect from '/imports/accounts/redirect.js';

import './login.html';

Template.login.onCreated(function onLoginCreated() {
  Tracker.autorun(function() {
    userRedirect('login');
  });
});
