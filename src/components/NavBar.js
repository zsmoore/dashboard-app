import React, { Component } from 'react';
import '../App.css';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Login from './Login';
import Signup from './Signup';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Menu from 'grommet/components/Menu';

class Navbar extends Component {
  
	constructor(props) {
    super(props);
		this.showComponent = '';
		this.check = false;

		this._onButtonClick = this._onButtonClick.bind(this);
		this._check = this._check.bind(this);
  }

	_check(v) {
		this.check = v;
	}

  _onButtonClick(value) {
		this.props.setPopup(value)
		if (this.props.loggedIn) this.props.logout();
  }

  render() {
  	let { setPopup, user, loggedIn, message, currentPopup } = this.props; 
		let popup = '';
  	if (currentPopup === 'login'){
  	 popup = <Login setPopup={setPopup} message={message} login={this.props.login} onButtonClick={this._onButtonClick}/>;
  	} else if(currentPopup === 'signup'){
  	  popup = <Signup setPopup={setPopup} message={message} signup={this.props.signup} onButtonClick={this._onButtonClick}/>;
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
