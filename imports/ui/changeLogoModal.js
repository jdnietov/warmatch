import { Template } from 'meteor/templating';
import { ImagesCol } from '/imports/api/images.js';
import { Teams } from '/imports/api/teams.js'

import './changeLogoModal.css';
import './changeLogoModal.html';

Template.changeLogoModal.events({
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
    console.log("asd");
    var name = Session.get("teamName");
		var team = Teams.findOne({name:name});
    var img = Session.get('fileId');
    if(img){
	    ImagesCol.remove({_id:team.logo}, true);
	    Teams.update({_id:team._id}, {$set: {logo: img}});
    }
    Session.set("fileId",undefined);
    Modal.hide('changeLogoModal');
  },
  'click #cancel': function(event,instance) {
    ImagesCol.remove({_id:Session.get('fileId')}, true);
  }
});
