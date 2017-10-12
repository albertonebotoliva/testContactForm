const React = require('react')



class NavigationLogo extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<nav className="navbar navbar-inverse">
	  			<div className="container-fluid">
				    <div className="navbar-header">
				    	<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
					        <span className="sr-only">Toggle navigation</span>
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
				    	    <span className="icon-bar"></span>
				      	</button>
				      	<a className="navbar-brand" href="#">med<span>Go</span></a>
				    </div>
	    			<div className="collapse navbar-collapse" id="navbar-collapse-1">
				      	<ul className="nav navbar-nav"></ul>
				      	<ul className="nav navbar-nav navbar-right">
				        	<li><a href="#login">Login</a></li>
				      	</ul>
	    			</div>
	  			</div>
			</nav>
		)
	}
}

module.exports = NavigationLogo