import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { ImagesCol } from '/imports/api/images.js';

import './explore.css';
import './explore.html';
import '/client/navbar/navbar.html'

Meteor.subscribe('allUsers');


Template.explore.helpers({
  userList: function(val){
    var filter = Session.get("userFilter");
    if(val)var regExx = "^"+val;
    else var regExx = ".*";
    if(filter){
      var regEx = ".*"+filter+".*";
      var query = Meteor.users.find(
        {$and:[
          {"profile.sportsString": {$regex : regEx, $options: 'i'}},
          {$or: [{"profile.name": {$regex : regExx, $options: 'i'}},{username: {$regex : regExx, $options: 'i'}}]}
        ]}
      ).fetch();
    }
    else{
      var query = Meteor.users.find({$or: [{"profile.name": {$regex : regExx, $options: 'i'}},{username: {$regex : regExx, $options: 'i'}}]}).fetch();
    }
    return query;
  },

  teamList: function(val){
    var filter = Session.get("userFilter");
    var regExx = "^"+val;
    if(filter){
      var regEx = ".*"+filter+".*";
      var query = Teams.find({$and:[{name:{$regex : regExx}},{sport: {$regex : regEx, $options: 'i'}}]});
    }
    else{
      if(val){
        var query = Teams.find({name: {$regex : regExx}});
      }
      else var query = Teams.find();
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

Template.searchCard.helpers({
	photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  }
})

Template.teamCard.helpers({
  photoUrl: photo => {
    var imageId = photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  }
})
