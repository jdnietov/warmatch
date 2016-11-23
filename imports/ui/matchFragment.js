import { Template } from  'meteor/templating';

import './matchFragment.css';
import './matchFragment.html';

Template.matchFragment.helpers({
	'getStatus': function(){
		if(this.status == "accepted"){return "Aceptado";}
		if(this.status == "rejected"){return "Rechazado";}
		if(this.status == "pending"){return "Pendiente";}
	}
});
