import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '/imports/startup/accounts-config.js';
import '/imports/startup/client';
import '/imports/ui/templates.js';

import './main.html';

// if(Meteor.userId()) {
//   console.log("Il y a des usagers");
//   Router.go('/dashboard');
// }

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });
//
// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });
//
// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     Router.go('/login');
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
