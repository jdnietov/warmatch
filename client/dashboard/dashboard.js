import { Template } from 'meteor/templating';

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
