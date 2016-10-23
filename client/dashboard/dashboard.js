import { Template } from 'meteor/templating';

import '/imports/ui/matchFragment.js';
import noUserRedirect from '/imports/accounts/redirect.js';

import './dashboard.html';

Template.dashboard.onCreated( function dashboardOnCreated() {
  noUserRedirect('dashboard');
});
