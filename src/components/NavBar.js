import React, { Component } from 'react';
import '../App.css';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Login from './Login';
import Signup from './Signup';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Menu from 'grommet/components/Menu';

class Navbar extends Component {
  
	constructor(props) {
    super(props);
    this.state = {
      showComponent: '',
	};
	this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(value, type, change) {
    this.setState({ showComponent: value });
	if (type) this.props.logout();
  }

  render() {
  	const { showComponent } = this.state;
  	const { user, loggedIn } = this.props; 
  	let popup = '';
  	if (showComponent === 'login'){
  	  popup = <Login login={this.props.login} onButtonClick={this._onButtonClick}/>;
  	} else if(showComponent === 'signup'){
  	  popup = <Signup signup={this.props.signup} onButtonClick={this._onButtonClick}/>;
	}
	let label, value, greeting;  
	if(loggedIn) {
	  label = 'Log Out';
	  value = '';
	  greeting = <Label>Hello, {user.username}</Label>;
	} else {
	  label = 'Log In';
	  value = 'login';
	  greeting = '';
	}

	const button = (
		<Button label={label} style={{ backgroundColor: 'white', color: '#865CD6' }}
			onClick={() => this._onButtonClick(value, label === 'Log Out', false )}
		/>
	);

    return (
      <Header size='small' separator='bottom' style={{ backgroundColor: '#865CD6' }}>
				<Box pad={{ horizontal: 'medium' }}>
						<Heading style={{ fontSize: '60', color: 'white' }} margin='small'>Who's Hungry?</Heading>
				</Box>
				<Box flex={true} justify='end' direction='row' responsive={false}>
				{greeting}
				<Box pad={{ horizontal: 'medium' }}>
					<Menu style={{ borderRadius: '5px' }} icon={<MenuIcon />} colorIndex='light-1' />
				</Box>
					{popup}
				</Box>
			</Header>
    );
  }
}

export default Navbar;
