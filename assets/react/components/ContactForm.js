const React = require('react')
const $ = require ('jquery');

const inputParsers = {
	ucfirst(input) {
	    return input.charAt(0).toUpperCase() + input.slice(1)
  	}
}

class ContactForm extends React.Component{
	
	constructor(props){
		super(props)

		this.state = {
			displayErrors: false,
			message: {
				class: "message",
				text: ""
			}
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.checkValidation = this.checkValidation.bind(this)
		this.saveContactInfo = this.saveContactInfo.bind(this)
	}

	formDataToJSON(formData) {    
	    var convertedJSON = {},
	       	it = formData.entries(),
	       	n;

	    while(n = it.next()) {
	      if(!n || n.done) break;
	      convertedJSON[n.value[0]] = n.value[1];
	    }

	    return convertedJSON;
	}
	parseData(data,form){
		for (let name of data.keys()) {
	     	const input = form.elements[name];
	      	const parserName = input.dataset.parse;

	      	if (parserName) {
	        	const parser = inputParsers[parserName];
	        	const parsedValue = parser(data.get(name));
	        	data.set(name, parsedValue);
	      	}
	    }
	}
	checkValidation(form){
		if (!form.checkValidity()) {
		    this.setState({ displayErrors: true })
		    return false
	  	}
		this.setState({ displayErrors: false })
		return true
	}
	handleSubmit(e){
		
		e.preventDefault()
		const form = e.target
    	const data = new FormData(form)

    	//Handle the validation
    	let validation = this.checkValidation(form)
    	if( validation === true){
			//Parser
			this.parseData(data,form)
		    //Convert the data to json
		    let json = this.formDataToJSON(data)
		    //Call to Backend
		    let response = this.saveContactInfo(json)
    	}
	}

	saveContactInfo(data) {
		const _this = this
		
		$.ajax({
	      url: "/saveContactInfo",
	      dataType: 'json',
	      type: 'POST',
	      data:data,
	      success: function(result) {
	      	console.log(result)
	      	_this.setState({ 
	        	message: {
	        		class: "message message-show success", 
	        		text:"Your message has been sent"
	        	} 
        	})
	      },
	      error: function(xhr, status, err) {
	        console.log(status)
	        _this.setState({ 
	        	message: {
	        		class: "message message-show error", 
	        		text:"Something went wrong"
	        	} 
        	})
	      }
    	})
  	}

  	renderElement(element, obj){
  		switch(element){
  			case 'input':
		  		return(
					<input {...obj} data-parse={obj.dataParse} />
				) 
				break;
			case 'textarea':
		  		return(
					<textarea {...obj} ></textarea>
				) 
				break;
			default:
  		}
  	}

	render(){
		const { displayErrors } = this.state;
		const fields = this.props.formConfig.fields
		let message = this.state.message


		return (
			<form 
				className={displayErrors ? 'displayErrors form-signin' : 'form-signin'} 
				noValidate
				onSubmit={this.handleSubmit}
			>
		        <h3 className="form-signin-heading">{this.props.formConfig.title}</h3>
		        <h4 className={message.class}>{message.text}</h4>
		        {
		        	fields.map( (object, i) => {
		        		return (
		        			<div key={i}>
			        			<label htmlFor={object.name}>{object.label}</label>
				        		{this.renderElement(object.element,object.attributes)}
					        	<small>{object.validation}</small><br />
				        	</div>	
		        		)
		        	})
		        }
		        <button className="btn btn-lg btn-primary btn-block" type="submit">{this.props.formConfig.button}</button>
		    </form>	
		)
	}
}

module.exports = ContactForm