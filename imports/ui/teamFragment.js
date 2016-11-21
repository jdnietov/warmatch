import './teamFragment.css';
import './teamFragment.html';

import { ImagesCol } from '/imports/api/images.js';

Template.teamFragment.helpers({
	photoUrl: photo => {
    var imageId = photo;
    var image = ImagesCol.findOne({_id:imageId});
    return image;
  },
});

Template.teamFragment.events({
	'click #btn-seeTeam': function(event, instance) {
		Router.go('/team/' + this.name);
  }
});
