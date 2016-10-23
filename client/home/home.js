import { Template } from 'meteor/templating';

import './home.html';

Template.home.events({
  'click #go-login'(event, instance) {
    Router.go('/login');
  }
});
