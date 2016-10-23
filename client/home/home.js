import { Template } from 'meteor/templating';

import '/imports/ui/matchFragment.js';
// import './imports/ui/match-fragment.html';
import './home.html';

if(Meteor.userId()) {
  console.log("Il y a des usagers");
  Router.go('/dashboard');
}
