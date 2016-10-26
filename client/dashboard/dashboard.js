import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import '/imports/ui/matchFragment.js';
import './dashboard.html';
<<<<<<< HEAD

/*Template.dashboard.onCreated( function dashboardOnCreated() {
  Tracker.autorun(function() {
    userRedirect('dashboard');

});*/

Template.dashboard.events({
  'click button'(event, instance) {
    Router.go('/createMatch');
  }
});
=======
>>>>>>> 287518a4b564cae584098b3fb0e8792d65e661a0
