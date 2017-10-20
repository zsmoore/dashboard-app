import React, { Component } from 'react';
import '../App.css';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Login from './Login';
import Signup from './Signup';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';

/**
 * Component for navbar header.
 * @prop message {string} - the current error message to display
 * @prop loggedIn {bool} - Whether there is currently a user logged in
 * @prop user {object} - the current user (or mock user if not logged in)
 * @prop login {func} - login function
 * @prop logout {func} - logout function
 * @prop signup {func} - sign up function
 * @prop currentPopup {string} - the current popup ('', 'login','signup') to display
 * @prop setPopup {func} - sets the current popup
 */
class Navbar extends Component {
  
	constructor(props) {
    super(props);
		this.showComponent = '';

		this._onButtonClick = this._onButtonClick.bind(this);
  }

  /**
   * function activated when the login or log out button are clicked
   * @param {string} value - the value to set the current popup to in the app props
  */
  _onButtonClick(value) {
		this.props.setPopup(value)
		if (this.props.loggedIn) this.props.logout();
  }

  /**
   * re renders the page when props or state are updated
   */
  render() {
  	let { setPopup, user, loggedIn, message, currentPopup } = this.props; 
		let popup = '';
  	if (currentPopup === 'login'){
  	 popup = <Login setPopup={setPopup} message={message} login={this.props.login} />;
  	} else if(currentPopup === 'signup'){
  	  popup = <Signup setPopup={setPopup} message={message} signup={this.props.signup} />;
	  }
		let label, value, greeting;  
		if(loggedIn) {
			label = 'Log Out';
			value = '';
			greeting = <Label margin='small' style={{ color:'white' }}>Hello, {user.username}!</Label>;
		} else {
			label = 'Log In';
			value = 'login';
			greeting = '';
		}
		const button = (
			<Button label={label} style={{ borderColor: '#FDC92B', backgroundColor: '#FDC92B', color: 'white', }}
				onClick={() => this._onButtonClick(value)}
				primary={true}
			/>
		);

    return (
      <Header separator='bottom' style={{ backgroundImage: "url('img/header-bg.jpg')" }}>
				<Box pad='small'>
					<Headline style={{ color: '#FDC92B' }} margin='small'>Who's Hungry?</Headline>
				</Box>
				<Box flex={true} justify='end' direction='row' responsive={false}>
				<Box>
					{greeting}
				</Box>
				<Box pad={{ horizontal: 'medium' }}>
					{button}
				</Box>
					{popup}
				</Box>
			</Header>
    );
  }
}

export default Navbar;
