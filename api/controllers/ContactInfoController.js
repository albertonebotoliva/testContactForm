/**
 * ContactInfoController
 *
 * @description :: Server-side logic for managing Contactinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	emailIsValid:function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},


	save:function(req, res){

		if (!(req.param("email") && req.param("name") && req.param("message") && this.emailIsValid(req.param("email"))))
		{
	        res.badRequest({error: 'Failed attempt.'})
	    }
	    else
	    {
	    	ContactInfo.create( req.params.all(), (err,obj) => {
				if(err) console.log(err)
			})
			res.created({success: true})
	    }
	    
	}
	
}

