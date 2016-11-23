import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';

import './changePicModal.css';
import './changePicModal.html';

Template.changePicModal.events({
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
  'submit #imgForm':function(event, instance) {
    event.preventDefault();
    var userId = Meteor.user()._id;
    var img = Session.get('fileId');
    if(img){
      var data = Meteor.user().profile;
      ImagesCol.remove({_id:data.photo}, true);
      data.photo=img;
      Meteor.users.update({_id:userId}, {$set: {profile: data}});
    }
    Session.set("fileId",undefined);
    Modal.hide('changePicModal');
  },
  'click #cancel': function(event,instance) {
    ImagesCol.remove({_id:Session.get('fileId')}, true);
  }
});
