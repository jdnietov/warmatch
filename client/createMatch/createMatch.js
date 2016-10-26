import { Template } from 'meteor/templating';
import userRedirect from '/imports/accounts/redirect.js';

import '/imports/api/open-matches.js';

Template.createMatch.onCreated(function onCreateMatchCreated() {
  Tracker.autorun(function() {
    userRedirect('createMatch');
  });
});

Template.createMatch.events({
  'submit form'(event, instance) {
    event.preventDefault();
    const target = event.target;

    const _title = target.title.value;
    const _sport = target.sport.value;
    const _place = target.where.value;
    const _date = target.when.value;

    OpenMatch.insert({
      title: _title,
      sport: _sport,
      place: _place,
      date: _date
    });

    console.log("Inserted!");
    Router.go('/');
  }
});
