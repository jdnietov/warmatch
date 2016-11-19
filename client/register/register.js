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
    const target = event.target;
    var username = target.username.value;
    var email = target.email.value;
    var password = target.password.value;
    var name = target.name.value;
    var lastName = target.lastName.value;
    var photo = target.photo.value;
    var phone = target.phone.value;
    var sports = [];
    if(target.football.checked) sports.push("Fútbol");
    if(target.basketball.checked) sports.push("Baloncesto");
    if(target.baseball.checked) sports.push("Béisbol");
    if(target.volleyball.checked) sports.push("Vóleibol");
    if(target.tenis.checked) sports.push("Tenis");

    if(name.length<3){
      Session.set("error","El nombre debe tener 3 carácteres mínimo");
    }

    else if(!validateString(name)){
      Session.set("error","El nombre solo puede contener letras");
    }

    else if(lastName.length<3){
      Session.set("error","El apellido debe tener 3 carácteres mínimo");
    }

    else if(!validateString(lastName)){
      Session.set("error","El apellido solo puede contener letras");
    }

    else if(username.length<6){
      Session.set("error","El usuario debe tener 6 carácteres mínimo");
    }

    else if(!validateEmail(email)){
      Session.set("error","El correo eléctronico no es válido");
    }

    else if(password.length<6){
      Session.set("error","La contraseña debe tener 6 carácteres mínimo");
    }

    else if(sports.length==0){
      Session.set("error","Debes seleccionar al menos un deporte");
    }

    else if(phone.length<7 || phone.length>10 || isNaN(phone)){
      Session.set("error","Teléfono inválido");
    }

    else{
      Accounts.createUser({
        username: username,
        password: password,
        email: email,
        profile: {
          name: name,
          lastName: lastName,
          sports: sports,
          phone: phone,
          photo: photo,
          createdAt: new Date()
        }
      }, function(error){
        if(error){
          Session.set("error", error.reason);
        }
        else{
          Session.set("error",null);
          Router.go('/');
        }
      });
    }
  }
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateString(string) {
  var re = /^[a-zA-Z]+$/;
  return re.test(string);
}
