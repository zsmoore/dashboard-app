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
    this.state = {
      showComponent: '',
	};
	this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(value, type, change) {
  	console.log('button click');
    this.setState({ showComponent: value });
	if (type) this.props.logout();
  }

  render() {
  	const { showComponent } = this.state;
  	const { user, loggedIn } = this.props; 
  	let popup = '';
  	// if (showComponent === 'login'){
  	//  popup = <Login login={this.props.login} onButtonClick={this._onButtonClick}/>;
  	// } else if(showComponent === 'signup'){
  	if (!loggedIn) popup = <Signup signup={this.props.signup} onButtonClick={this._onButtonClick}/>;
	// }
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
			onClick={() => this._onButtonClick(value, label === 'Log Out', false )}
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
