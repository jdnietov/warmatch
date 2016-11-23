import './teamFragment.css';
import './teamFragment.html';

import { RegisterTURs } from '/imports/api/registerTURs.js';
import { ImagesCol } from '/imports/api/images.js';

Template.teamFragment.helpers({
	photoUrl: photo => {
    var imageId = photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },

	numRequests: length => {
		var len = length;
		if(length == 1) {
			len += " solicitud";
		} else len += " solicitudes";
		return len;
	},

	isAdmin: name => {
		return RegisterTURs.find({
			userName: Meteor.user().username,
			teamName: name,
			roleName: "Administrador"
		}).fetch().length != 0;
	}
});

Template.teamFragment.events({
	'click #btn-seeTeam': function(event, instance) {
		Router.go('/team/' + this.name);
  }
});
