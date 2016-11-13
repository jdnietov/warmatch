import { Meteor } from 'meteor/meteor';

var redirect = {};
redirect['login'] = 'out';
redirect['register'] = 'out';
redirect['home'] = 'out';
redirect['dashboard'] = 'in';
redirect['createMatch'] = 'in';
//redirect['createTeam'] = 'in';

// react and redirect depending on user
export default function userRedirect(url) {
  if(redirect[url] == 'in' && !Meteor.userId()) {
    console.log("Not logged in!");
    Router.go('/');
  }
  else if(redirect[url] == 'out' && Meteor.userId()) {
    console.log("Already logged in!");
    Router.go('/dashboard');
  }
}
