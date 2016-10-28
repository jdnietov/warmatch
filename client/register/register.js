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
    var futbol = $('[name=futbol]').prop("checked");
    var basquetball = $('[name=basquetball]').prop("checked");
    var baseball = $('[name=baseball]').prop("checked");
    var voleyball = $('[name=volleyball]').prop("checked");
    var tenis = $('[name=tenis]').prop("checked");

    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        nombre: nombre,
        apellido: apellido,
        futbol: futbol,
        basquetball: basquetball,
        baseball: baseball,
        voleyball: voleyball,
        tenis: tenis,
        foto: foto
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
