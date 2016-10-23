import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

// react and redirect depending on user
Tracker.autorun( function() {
  var userId = Meteor.userId();
  if(userId) {
    Router.go('/dashboard');
  } else {
    Router.go('/');
  }
} );
