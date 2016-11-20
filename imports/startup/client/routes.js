import { Meteor } from 'meteor/meteor';
import '/client/home/home.html';
import '/client/dashboard/dashboard.html';
import '/client/login/login.html';
import '/client/register/register.html';
import '/client/profile/profile.html';
import '/client/search/search.html';
import '/client/explore/explore.html'

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

// render login
Router.route('/login',function(){
  if(!Meteor.user()){
    this.render('login',{
      to:'main'
    });
  }
  else{
    Router.go('/');
  }
});

// render register
Router.route('/register',function(){
  if(!Meteor.user()) {
    this.render('register',{
      to: 'main'
    });
  } else {
    Router.go('/');
  }
});

// render about page
Router.route('/about',function(){
  this.render('about',{
    to: 'main'
  })
});

Router.route('/explore',function(){
  this.render('explore',{
    to: 'main'
  })
});

// render username's profile
Router.route('/profile/:_username', function () {
  if(this.params._username!="errorNotFound"){
    this.render('profile',{
      to:'main',
      data:function(){
        Session.set("challengedName", this.params._username);
        return Meteor.users.findOne({username:this.params._username});
      }
    });
  }
  else{
    this.render('not-found', {
      to:'main'
    });
  }
});

// render createTeam page
Router.route('/createTeam', function() {
	this.render('createTeam', {
		to: 'main'
	})
})

// render teams page
Router.route('/team/:_teamName', function () {
	this.render('team', {
		to: 'main',
		data: {value: this.params._teamName}
	})
})


// render search page
Router.route('/search/:_searchValue', function () {
	this.render('search', {
		to: 'main',
		data: function(){return {val: this.params._searchValue};}
	})
})
