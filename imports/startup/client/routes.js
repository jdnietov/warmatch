import { Meteor } from 'meteor/meteor';

import '/client/home/home.html';
import '/client/dashboard/dashboard.html';
import '/client/login/login.html';
import '/client/register/register.html';
import '/client/createMatch/createMatch.html';
import '/client/profile/profile.html';

Router.configure({
  layoutTemplate: "application-layout"
});

Router.route('/', function () {
  if(Meteor.user()){
    this.render('dashboard',{
      to: 'main'
    });
  }
  else{
    this.render('home',{
      to: 'main'
    });
  }
});
Router.route('/login',function(){
  this.render('login',{
    to: 'main'
  })
});
Router.route('/register',function(){
  this.render('register',{
    to: 'main'
  })
});
Router.route('/profile/:_username', function () {
  this.render('profile',{
    to:'main',
    data:function(){
      return Meteor.users.findOne({username:this.params._username});
    }
  });
});
Router.route('/createMatch',function(){
  this.render('createMatch',{
    to:'main'
  })
});
