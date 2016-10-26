import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './register.html';

Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var username = $('[name=username]').val();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    var nombre = $('[name=nombre]').val();
    var apellido = $('[name=apellido]').val();
    var foto = $('[name=foto]').val();
    var deportes = "";
    if($('[name=futbol]').prop("checked")){
      deportes += "Futbol, ";
    }
    if($('[name=basquetball]').prop("checked")){
      deportes += "Basquetball, ";
    }
    if($('[name=baseball]').prop("checked")){
      deportes += "Baseball, ";
    }
    if($('[name=volleyball]').prop("checked")){
      deportes += "Volleyball, ";
    }
    if($('[name=tenis]').prop("checked")){
      deportes += "Tenis";
    }
    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        nombre: nombre,
        apellido: apellido,
        deportes: deportes,
        img_src: foto
      }
    });
    Router.go('/');
  }
});
