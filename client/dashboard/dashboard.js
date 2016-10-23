import { Template } from 'meteor/templating';

import '/imports/ui/matchFragment.js';

import './dashboard.html';

if(!Meteor.userId()) {
  console.log("Il y a des usagers");
  Router.go('/');
}

Template.dashboard.events({
  'click button'(event, instance) {
    Router.go('/');
  }
});
