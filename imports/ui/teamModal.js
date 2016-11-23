import { Template } from 'meteor/templating';
import { Teams } from '/imports/api/teams.js';
import { RegisterTURs } from '/imports/api/registerTURs';
import { ImagesCol } from '/imports/api/images.js';

import './teamModal.css';
import './teamModal.html';

Template.teamModal.events({
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
  'submit #teamForm'(event, instance) {
    event.preventDefault();
    const target = event.target;
		console.log("asd");
    Teams.insert({
      name: target.name.value,
			description: target.description.value,
      sport: target.sport.value,
			logo: Session.get("fileId"),
			statistics: [
				{name: "Partidos jugados", value: 0},
				{name: "Partidos ganados", value: 0},
				{name: "Partidos perdidos", value: 0},
				{name: "Partidos empatados", value: 0}
			],
      requests: []
    });

		RegisterTURs.insert({
			teamName: target.name.value,
			userName: Meteor.user().username,
			roleName: "Administrador"
		})

    Session.set("fileId",undefined);
		Modal.hide('teamModal');
	}
});
