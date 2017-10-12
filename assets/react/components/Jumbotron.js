const React = require('react')

class Jumbotron extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		let style = { "height" : this.props.height }
		
		return (
			<div className="jumbotron" style={style}>
				<div className="container">
					<div className="col-md-8">
						<p><img src="/images/logo.png" width="200" /></p>
					  	<b>#PLATEFORME DE GESTIONS DES VACATIONS DES SOIGNANTS</b>
					  	<h1>{this.props.message}</h1>
					  	<p>Nous offrons le meilleur service aux professionnels de la santé.</p>
					</div>
					<div className="col-md-4">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Jumbotron