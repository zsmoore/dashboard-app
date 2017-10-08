import React, { Component } from 'react';
import '../App.css';
import LoginForm from 'grommet/components/LoginForm';
import Layer from 'grommet/components/Layer';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

class Login extends Component {

  constructor(props) {
		super(props);
  	this._submit = this._submit.bind(this);
  }

  _submit(username, password) {
		if(!username || !password) return;
		this.props.login(username, password);
		this.props.onButtonClick('', true);
  }

  render() {
    return (
    	<Layer closer={true} onClose={() => this.props.onButtonClick('')}>
      	<LoginForm 
	        onSubmit={({ username, password }) => this._submit(username, password)}
	  			title='Hungry Already?' // errors={this.props.user.errors}
	  		/>
	  		<Box pad={{horizontal: 'medium', vertical: 'small'}}>
	  			<Anchor href='#' label='Sign up' onClick={() => this.props.onButtonClick('signup')}/>
	  		</Box>
      	</Layer>
    );
  }
}

export default Login;