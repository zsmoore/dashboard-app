import React, { Component } from 'react';
import '../App.css';
import LoginForm from 'grommet/components/LoginForm';
import Layer from 'grommet/components/Layer';
import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';


class Login extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	showComponent: false,
	    };
	    this._onButtonClick = this._onButtonClick.bind(this);
	}

	_onButtonClick() {
		this.setState({
	    	showComponent: true,
		});
  }

  render() {
    return (
    	<Layer closer={true} onClose={() => console.log('TODO')}>
      		<LoginForm 
	      		onSubmit={() => console.log('Trying')}
	  			title='Hungry Already?'
	  			forgotPassword={<Anchor href='#' label='Forgot password?' />}
	  			rememberMe={true} />
	  			<Box pad={{horizontal: 'medium', vertical: 'small'}}>
	  				<Anchor href='#' label='Sign up' />
	  			</Box>
      	</Layer>
    );
  }
}

export default Login;