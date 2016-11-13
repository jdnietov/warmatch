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

    const _title = target.title.value;
    const _sport = target.sport.value;
    const _place = target.where.value;
    const _date = target.when.value;

		console.log(_title);
		console.log(_sport);
		console.log(_place);
		console.log(_date);

    OpenMatches.insert({
      title: _title,
      sport: _sport,
      place: _place,
      date: _date,
      createdAt: new Date()
    });

    console.log("Inserted!");
    Router.go('/')
  }
});
