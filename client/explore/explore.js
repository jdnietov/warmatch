import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { ImagesCol } from '/imports/api/images.js';
import { starRatingService } from 'meteor/arkham:stars-rating-ui';

import './explore.css';
import './explore.html';
import '/client/navbar/navbar.html'

Meteor.subscribe('allUsers');


Template.explore.helpers({
  userList: function(val){
    var filter = Session.get("userFilter");
    if(val){
      var temp = val.split("%20");
      val = "";
      for(var i=0; i<temp.length; i++){
        val += temp[i];
      }
    }
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
    if(val)var regExx = "^"+val;
    else var regExx = ".*";
    if(filter){
      var regEx = ".*"+filter+".*";
      var query = Teams.find({$and: [{name: {$regex : regExx, $options: 'i'}}, {sport: {$regex : regEx, $options: 'i'}}]});
    }
    else {
      var query = Teams.find({name: {$regex : regExx, $options: 'i'}});
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
  },
  miniDescription: function(description){
    if(description.length>30){
      return description.slice(0,30) + "...";
    }
    else return description;
  }
})
