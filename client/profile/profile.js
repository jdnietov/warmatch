import './profile.css';
import './profile.html';

Session.set("editing",false);

Template.profile.helpers({
  allowed: function(username){
    return username===Meteor.user().username;
  },
  isEditing: function(){
    return Session.get("editing");
  },
  deportes: function(profile){
    var deportes ="";
    if(profile.futbol){
      deportes += "Futbol ";
    }
    if(profile.basquetball){
      deportes += "Basquetball ";
    }
    if(profile.baseball){
      deportes += "Baseball ";
    }
    if(profile.volleyball){
      deportes += "Volleyball ";
    }
    if(profile.tenis){
      deportes += "Tenis";
    }
    return deportes;
  }
});

Template.profile.events({
  'click .añadir-foto': function(event){
    Session.set("editing",true);
  },
  'click .guardar-foto': function(event){
    var userId = Meteor.user()._id;
    var img = $('#img_src').val()
    var data = Meteor.user().profile;
    data.foto = img;
    Meteor.users.update({_id:userId}, {$set: {profile: data}});
    Session.set("editing",false);
  },
  'click .cancelar': function(event){
    Session.set("editing",false);
  }
})
