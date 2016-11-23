import { Template } from 'meteor/templating';

import './editProfileModal.css';
import './editProfileModal.html';

Template.editProfileModal.helpers({
  error: () =>{
    return Session.get("error");
  },
  getUser: () => {
    return Meteor.user();
  },
  football: () =>{
    return Meteor.user().profile.sports.indexOf('Fútbol')>=0;
  },
  basket: () =>{
    return Meteor.user().profile.sports.indexOf('Baloncesto')>=0;
  },
  baseball: () =>{
    return Meteor.user().profile.sports.indexOf('Béisbol')>=0;
  },
  volley: () =>{
    return Meteor.user().profile.sports.indexOf('Vóleibol')>=0;
  },
  tenis: () =>{
    return Meteor.user().profile.sports.indexOf('Tenis')>=0;
  }
});

Template.editProfileModal.events({
  'submit #editForm':function(event, instance) {
    event.preventDefault();
    Session.set("error",null);
    var target = event.target;
    var userId = Meteor.user()._id;
    var data = Meteor.user().profile;
    var name = event.target.name.value;
    var phone = event.target.phone.value;
    var sports = [];
    var sportsString = "";
    if(name.length<3){
      Session.set("error","El nombre debe tener 3 carácteres mínimo");
    }
    else if(!validateString(name)){
      Session.set("error","El nombre solo puede contener letras");
    }
    else if(phone.length<7 || phone.length>10 || isNaN(phone)){
      Session.set("error","Teléfono inválido");
    }
    else{
      Session.set("error",null);
    }
    if(target.football.checked) {sports.push("Fútbol");sportsString+="Fútbol ";}
    if(target.basketball.checked) {sports.push("Baloncesto");sportsString+="Baloncesto ";}
    if(target.baseball.checked) {sports.push("Béisbol");sportsString+="Béisbol ";}
    if(target.volleyball.checked) {sports.push("Vóleibol");sportsString+="Vóleibol ";}
    if(target.tenis.checked) {sports.push("Tenis");sportsString+="Tenis ";}

    if(!Session.get("error")){
      data.name=name;
      data.phone = phone;
      data.sports= sports;
      data.sportsString=sports;

      Meteor.users.update({_id:userId}, {$set:{profile:data}});
      Modal.hide('changePicModal');
    }
  }
});

function validateString(string) {
  var re = /^[a-zA-Z\s]*$/;
  return re.test(string);
}
