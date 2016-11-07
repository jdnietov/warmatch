import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './register.html';

Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var username = $('[name=username]').val();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var name = $('[name=name]').val();
    var lastName = $('[name=lastName]').val();
    var photo = $('[name=photo]').val();
    var football = $('[name=football]').prop("checked");
    var basketball = $('[name=basketball]').prop("checked");
    var baseball = $('[name=baseball]').prop("checked");
    var voleyball = $('[name=volleyball]').prop("checked");
    var tenis = $('[name=tenis]').prop("checked");

    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        name: name,
        lastName: lastName,
        football: football,
        basketball: basketball,
        baseball: baseball,
        voleyball: voleyball,
        tenis: tenis,
        photo: photo
      }
    }, function(error){
      if(error){
        window.alert(error.reason);
      }
      else{
        Router.go('/');
      }
    }, function(error){
      if(error){
        window.alert(error.reason);
      }
      else{
        Router.go('/');
      }
    });
  }
});
