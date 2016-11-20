import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { MatchSchema } from './schemas.js';

Match = new Mongo.Collection('matches');
Match.attachSchema(MatchSchema);

export const Matches = Match;

Meteor.methods({
  'matches.send-invite'(challenged, local_id) {
    check(challenged, String);

    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // send notification to challenged
    var matches = Meteor.users.findOne({username: challenged}).profile.matchRequests;
    var match_id = Match.find({
      local_id: local_id},
      {sort: {createdAt: -1}}).fetch()[0]._id;
    matches.push(match_id);

    var user_id = Meteor.users.find({username: challenged}).fetch()[0]._id;
    Meteor.users.update(user_id, {$set: {"profile.matchRequests": matches}});
  }
});
