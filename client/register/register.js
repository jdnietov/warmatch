import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { ImagesCol } from '/imports/api/images.js';

import './register.html';

Session.set("error",null)
Session.set('fileId',undefined);

Template.register.helpers({
  error: function(){
    return Session.get("error");
  }
})

Template.register.events({
  'change .myFileInput': function(event, template) {
    if(Session.get('fileId')){
      ImagesCol.remove({_id:Session.get('fileId')}, true);
    }
    FS.Utility.eachFile(event, function(file) {
      ImagesCol.insert(file, function (err, fileObj) {
        var fileId = fileObj._id;
        Session.set('fileId', fileId);
      });
    });
  },
  'submit form': function(event){
    event.preventDefault();
    const target = event.target;
    var username = target.username.value;
    var email = target.email.value;
    var password = target.password.value;
    var name = target.name.value;
    var lastName = target.lastName.value;
    var photo = Session.get('fileId');
    var phone = target.phone.value;
    var sports = [];
    var sportsString ="";
    var matchRequests = [];
    var sentRequests = [];
    if(target.football.checked) {sports.push("Fútbol");sportsString+="Fútbol ";}
    if(target.basketball.checked) {sports.push("Baloncesto");sportsString+="Baloncesto ";}
    if(target.baseball.checked) {sports.push("Béisbol");sportsString+="Béisbol ";}
    if(target.volleyball.checked) {sports.push("Vóleibol");sportsString+="Vóleibol ";}
    if(target.tenis.checked) {sports.push("Tenis");sportsString+="Tenis ";}

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
    else if(photo.length<1){
      Session.set("error","Añade una foto");
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
          sportsString: sportsString,
          phone: phone,
          photo: photo,
          createdAt: new Date(),
          matchRequests: matchRequests,
          sentRequests: sentRequests
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
