import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import userRedirect from '/imports/accounts/redirect.js';

import './register.html';

Template.register.onCreated(function onRegisterCreated() {
  Tracker.autorun(function() {
    userRedirect('register');
  });
})
