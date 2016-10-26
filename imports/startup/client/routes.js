import { Meteor } from 'meteor/meteor';

import '/client/home/home.html';
import '/client/dashboard/dashboard.html';
import '/client/login/login.html';
import '/client/register/register.html';
import '/client/createMatch/createMatch.html';
import '/client/profile/profile.html';

Router.configure({
  layoutTemplate: 'app-layout'
});

Router.route('/', function () {
  if(Meteor.user()){
    this.render('dashboard',{
      to:'main'
    });
  }
  else{
    this.render('home',{
      to:'main'
    });
  }
});
Router.route('/login');
Router.route('/register');
Router.route('/dashboard');
Router.route('/profile');
Router.route('/createMatch');
