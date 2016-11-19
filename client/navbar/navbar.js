import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';

import './navbar.css';
import './navbar.html';

Template.navbar.onCreated(
  function(){
    this.Auxlog = new ReactiveVar("");
    this.Auxregist = new ReactiveVar("");
    this.Auxabout = new ReactiveVar("");
  }
);

Template.navbar.helpers({
  'activeLogin': function(){
    if(Router.current().route.getName() == 'login'){
      Template.instance().Auxlog.set("active");
      Template.instance().Auxregist.set("");
      Template.instance().Auxabout.set("");
    }else if(Router.current().route.getName() == 'register'){
      Template.instance().Auxlog.set("");
      Template.instance().Auxregist.set("active");
      Template.instance().Auxabout.set("");
    }else if(Router.current().route.getName() == 'about'){
      Template.instance().Auxlog.set("");
      Template.instance().Auxregist.set("");
      Template.instance().Auxabout.set("active");
    }else if(Router.current().route.getName() == undefined){
      Template.instance().Auxlog.set("");
      Template.instance().Auxregist.set("");
      Template.instance().Auxabout.set("");
    }
    return Template.instance().Auxlog.get();
  },
  'activeRegister': function(){
    return Template.instance().Auxregist.get();
  },
  'activeAbout': function(){
    return Template.instance().Auxabout.get();
  },
  photoUrl: profile => {
    var imageId = profile.photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },
});

Template.navbar.events({
  'click .logout'(event, instance) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  'submit form'(event, instance) {
    if(event.target.id=="searchbox"){
      event.preventDefault();
      Router.go('/search/' + event.target.search.value.toLowerCase());
    }
    else if(event.target.id=="login"){
      event.preventDefault();
      const target = event.target;
      var username = target.username.value;
      var password = target.password.value;

      Meteor.loginWithPassword(username,password,function(error){
        if(error){
          window.alert(error.reason);
        }
        else{
          Router.go('/');
        }
      });
    }
  }
});
