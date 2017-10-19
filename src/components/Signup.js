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
/**
 * Component for the sign in popup.
 * @prop {string} message - the current error message to display
 * @prop {func} signup - login function
 * @prop {func} setPopup - sets the current popup
 */
class Signup extends Component {

  constructor(props) { 
		super(props);
		this.state = { email: '', password: '', verify: '', message: ''};
		this._updateValue = this._updateValue.bind(this);
		this._signup = this._signup.bind(this);
  }

	/**
	 * updates the given input value in the state
	 * @param {object} event - object returned on keystroke of the following format: { target: { value } }
	 * @param {string} field - the name of the field to update
	 */
  _updateValue(event, field) {
		const val = event.target.value;
		const obj = {};
		obj[field] = val;
		this.setState(obj);
  }
	/**
	 * function called when the 'sign up' button is clicked.
	 * Checks that fields are filled in and correct, then calls this.props.signup
	 * to try to connect to the backend to create a new account
	 */
  _signup() {
		const { email, password, verify } = this.state;
		if(!email || !password || !verify) this.setState({ message: 'Not all fields were filled out.' }); 
		else if(email.indexOf('@') < 0) this.setState({ message: 'Invalid email provided.' });
		else if(password !== verify){
				this.setState({ message: 'Passwords don\'t match.' });
		} else {
			this.props.signup(email, password);
		}
  }

	/**
	 * re renders the page when props or state are updated
	 */
  render() {
		const message = this.props.message || this.state.message;
		const { email, password, verify } = this.state;
		const { setPopup } = this.props;
    return (
      <Layer closer={true} onClose={() => setPopup('')}>
      	<Box pad='medium'>
      	  <Heading strong={true} align='center'>Create an account!</Heading>
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
		  <Label style={{ color: 'red' }}>{message}</Label>
		  <Box pad='medium' align='center' width='100%'>
	  	  <Button label='Sign Up' style={{ borderColor: '#FDC92B', backgroundColor: '#FDC92B', color: 'white' }}
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