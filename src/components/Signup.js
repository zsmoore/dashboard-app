import React, { Component } from 'react';
import '../App.css';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';

class Signup extends Component {

	constructor(props) { 
		super(props);
		this.state = { email: '', password: '', verify: '', message: ''};
		this._updateValue = this._updateValue.bind(this);
		this._signup = this._signup.bind(this);
	}

	_updateValue(event, field) {
		const val = event.target.value;
		const obj = {};
		obj[field] = val;
		this.setState(obj);
	}

	_signup() {
		const { email, password, verify } = this.state;
		if(password === verify){
			this.props.signup(email, password);
		} else {
			this.setState({ message: 'Passwords don\'t match.' })
		}
	}

  render() {
  	const { email, password, verify, message } = this.state;
    return (
    	<Layer closer={true} onClose={() => this.props.onButtonClick('')}>
      		<Box pad='medium'>
      			<Heading strong={true} align='center'>Sign up!</Heading>
	      		<Form>
	  				<FormField label='Email'>
	    				<TextInput value={email} onDOMChange={(event) => this._updateValue(event, 'email')}/>
	    			</FormField>
	    			<FormField label='Password'>
	    				<input
              				id='password'
              				type='password'
              				value={password}
              				onChange={(event) => this._updateValue(event, 'password')}
            			/>
	    			</FormField>
	    			<FormField label='Verify password'>
	    				<input
              				id='verifypassword'
              				type='password'
              				value={verify}
              				onChange={(event) => this._updateValue(event, 'verify')}
            			/>
	    			</FormField>
				</Form>
				<Label>{message}</Label>
				<Box pad='medium' align='center' width='100%'>
					<Button label='Sign Up' 
						primary={true} onClick={() => this._signup()}
						fill={true}
					/>
	  			</Box>
			</Box>
      	</Layer>
    );
  }
}

export default Signup;