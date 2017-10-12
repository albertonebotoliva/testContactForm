var React = require('react'),
ReactDOM = require('react-dom');

let NavigationLogo = require('./components/NavigationLogo.react')
let Jumbotron = require('./components/Jumbotron')
let ContactForm = require('./components/ContactForm')


var LandingPage = React.createClass({

  getInitialState: function () {
    return {
      height: undefined,
      message: "Quand le temps est essentiel pour sauver une vie."
    }
  },

  componentDidMount: function () {
    this.setState({ height: window.innerHeight })
  },

  componentWillUnmount: function () {

  },


  getFormConfig: function () {
    var formArr = {
      title: "Comment pouvons nous nous améliorer?",
      button: "Nous t'attendons",
      fields: [{
            element: "input",
            label: "Email address",
            validation: "A valid Email",
            
            attributes: {
              type: "email",
              name: "email",
              placeholder: "Your email",
              
              className: "form-control",
              
              required: "required",
              autoFocus: "true"
            }
            
          },
          {
            element: "input",
            label: "Name",
            validation: "Only letters and spaces",
            
            attributes: {
              type: "text",
              name: "name",
              placeholder: "Your name",
              
              className: "form-control",
              
              required: "required",
              dataParse: "ucfirst",
              pattern: "[a-zA-Z ]+"
            }
          },
          {
            element: "textarea",
            label: "Message",
            validation: "Your message cannot be empty",
            
            attributes: {
              name: "message",
              placeholder: "Some message",
              
              className: "form-control",
              
              required: "required",
              rows: "6"
            }
          }]
    }

    return formArr
  },

  render: function() {

    var formConfig = this.getFormConfig()

    return (
      <div className="landingPage">
        <NavigationLogo />
        <Jumbotron height={this.state.height} message={this.state.message}>
          <ContactForm formConfig={formConfig} />
        </Jumbotron>
      </div>
     )
  }
})




ReactDOM.render(
  <LandingPage/>,
  document.getElementById('containerHome')
)



