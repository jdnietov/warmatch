import { Template } from 'meteor/templating';
import { starRatingService } from 'meteor/arkham:stars-rating-ui';

import './rateModal.css';
import './rateModal.html';

Template.rateModal.helpers({
  getProfileName: () => {
    return Meteor.users.find({username: Session.get("challengedName")}).fetch()[0].profile.name;
  },
  getUsername: () =>{
    return Session.get("challengedName");
  }
});

Template.rateModal.events({
  'click #btn-rate'(event, instance) {
    starRatingService.rate(Session.get("challengedName"),$(".prueba").data('userrating'));
    Modal.hide('rateModal');
  }
});
