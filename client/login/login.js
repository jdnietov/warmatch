import { Template } from 'meteor/templating';

import './login.html';

Template.login.events({
  'click button'(event, instance) {
    Router.go('/register');
  }
});
