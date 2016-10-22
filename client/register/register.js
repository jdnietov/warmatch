import { Template } from 'meteor/templating';

import './register.html';

Template.register.events({
  'click button'(event, instance) {
    Router.go('/dashboard');
  }
});
