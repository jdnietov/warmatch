import { Template } from 'meteor/templating';
import userRedirect from '/imports/accounts/redirect.js';
import { OpenMatches } from '/imports/api/open-matches.js';

Template.createMatch.onCreated(function onCreateMatchCreated() {
  Tracker.autorun(function() {
    userRedirect('createMatch');
  });
});

Template.createMatch.events({
  'submit form'(event, instance) {
    event.preventDefault();
    const target = event.target;

    const title = target.title.value;
    const sport = target.sport.value;
    const place = target.where.value;
    const date = target.when.value;
  }
});
