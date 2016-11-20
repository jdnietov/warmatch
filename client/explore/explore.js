import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { ImagesCol } from '/imports/api/images.js';

import './explore.css';
import './explore.html';

Meteor.subscribe('allUsers');

Template.explore.helpers({
  userList: function(){
    var filter = Session.get("userFilter");
    if(filter){
      var regEx = ".*"+filter+".*";
      var query = Meteor.users.find({"profile.sportsString": {$regex : regEx, $options: 'i'}});
    }
    else{
      var query = Meteor.users.find();
    }
    return query;
  },

  teamList: function(){
    var filter = Session.get("userFilter");
    if(filter){
      var regEx = ".*"+filter+".*";
      var query = Teams.find({sport: {$regex : regEx, $options: 'i'}});
    }
    else{
      var query = Teams.find();
    }
    return query;
  }
});

Template.explore.events({
  'click #filter': function(event){
    Session.set('userFilter',event.target.text);
  },
  'click #clean': function(event){
    Session.set('userFilter',undefined);
  }
})
