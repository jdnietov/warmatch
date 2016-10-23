import { Template } from 'meteor/templating';

import '/imports/ui/matchFragment.js';
// import './imports/ui/match-fragment.html';
import './home.html';

Template.home.onCreated(function homeOnCreated() {
  if(Meteor.userId()) {
    Router.go('/dashboard');
  }
});
