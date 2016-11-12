import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './register.html';

Session.set("error",null)

Template.register.helpers({
  error: function(){
    return Session.get("error");
  }
})

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
    var volleyball = $('[name=volleyball]').prop("checked");
    var tenis = $('[name=tenis]').prop("checked");



    if(!(football || basketball || baseball || volleyball || tenis)){
      Session.set("error","Debes elegir un deporte")
    }
    else if(username.length<6){
      Session.set("error","El nombre de usuario debe tener por lo menos 6 caracteres")
    }
    else if(password.length<6){
      Session.set("error","La contraseña debe tener por lo menos 6 caracteres")
    }
    else if(Meteor.users.findOne({'profile.email': email})){
      Session.set("error","El email esta en uso");
    }
    else{
      Accounts.createUser({
        username: username,
        password: password,
        profile: {
          email: email,
          name: name,
          lastName: lastName,
          football: football,
          basketball: basketball,
          baseball: baseball,
          volleyball: volleyball,
          tenis: tenis,
          photo: photo,
          createdAt: new Date()
        }
      }, function(error){
        if(error){
          console.log(error.reason);
          switch(error.reason){
            case 'Username already exists.':
              reason = 'El nombre de usuario ya existe';
              break;
            case 'Name is required':
              reason = 'Nombre requerido';
              break;
            case 'Last name is required':
              reason = 'Apellido requerido';
              break;
            case 'Photo is required':
              reason = 'Foto requerida';
              break;
          }
          Session.set("error", reason);
        }
        else{
          console.log(email);
          Session.set("error",null);
          Router.go('/');
        }
      });
    }
  }
});
