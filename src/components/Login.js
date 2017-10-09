import React, { Component } from 'react';
import '../App.css';
import LoginForm from 'grommet/components/LoginForm';
import Layer from 'grommet/components/Layer';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';

class Login extends Component {
  
  constructor(props) { 
    super(props);
    this.state = { email: '', password: '', message: ''};
    this._updateValue = this._updateValue.bind(this);
    this._submit = this._submit.bind(this);
    this.check = false;
   }

  _updateValue(event, field) {
    const val = event.target.value;
    const obj = {};
    obj[field] = val;
    this.setState(obj);
  }

  _submit(email, password) {
		if(!email || !password) this.setState({ message: 'Not all fields were filled out.' });
    else {const i = email.indexOf('@'); 
      if (i < 0) this.setState({ message: 'Invalid email provided.' });
      else {
        const username = email.substring(0, i);
        this.props.login(username, password);
      }
    }
  }

  render() {
    const message = this.props.message || this.state.message;
    const { email, password } = this.state;
    const { setPopup } = this.props;
    return (
    	<Layer closer={true} onClose={() => setPopup('')}>
      	<Box pad='medium'>
            <Heading strong={true} align='center'>Hungry Already?</Heading>
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
        </Form>
        <Label style={{ color: 'red' }}>{message}</Label>
        <Box pad='medium' align='center' width='100%'>
          <Button label='Log In' style={{ borderColor: '#FDC92B', backgroundColor: '#FDC92B', color: 'white' }}
            primary={true} onClick={() => this._submit(email, password)}
            fill={true}
          />
          </Box>
      </Box>
	  		<Box pad={{horizontal: 'medium', vertical: 'small'}}>
	  			<Anchor href='#' label='Sign up' onClick={() => setPopup('signup')}/>
	  		</Box>
      	</Layer>
    );
  }
}

export default Login;