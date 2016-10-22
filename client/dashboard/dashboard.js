import { Template } from 'meteor/templating';

import './dashboard.html';

Template.dashboard.events({
  'click button'(event, instance) {
    Router.go('/');
  }
});
