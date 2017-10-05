import React, { Component } from 'react';
import '../App.css';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Login from './Login';
import Signup from './Signup';
import Button from 'grommet/components/Button';

class Navbar extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	showComponent: '',
	    };
	    this._onButtonClick = this._onButtonClick.bind(this);
	}

	_onButtonClick(value) {
		this.setState({
	    	showComponent: value
		});
  }

  render() {
  	const { showComponent } = this.state;
  	let popup = '';
  	if(showComponent === 'login'){
  		popup = <Login login={this.props.login} onButtonClick={this._onButtonClick}/>;
  	} else if(showComponent === 'signup'){
  		popup = <Signup signup={this.props.signup} onButtonClick={this._onButtonClick}/>;
  	}
    return (
    	<Header>
			<Box pad='small'>
				<Headline margin='small'>Who's Hungry?</Headline>
			</Box>
			<Box flex={true} justify='end' direction='row' responsive={false}>
				<Box pad='medium'>
					<Button label='Log In'
						onClick={() => this._onButtonClick('login')}
  						href='#'
  						primary={true}
  						accent={false}
  						critical={false}
 						plain={false} />
  				</Box>
  				{popup}
			</Box>
		</Header>
    );
  }
}

export default Navbar;
