import React, { Component } from 'react';
import '../App.css';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Headline from 'grommet/components/Headline';
import Login from './Login';
import Button from 'grommet/components/Button';

class Navbar extends Component {
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
    	<Header>
			<Box pad='small'>
				<Headline margin='small'>Who's Hungry?</Headline>
			</Box>
			<Box flex={true} justify='end' direction='row' responsive={false}>
				<Box pad='medium'>
					<Button label='Log In'
						onClick={this._onButtonClick}
  						href='#'
  						primary={true}
  						accent={false}
  						critical={false}
 						plain={false} />
  				</Box>
  				{this.state.showComponent ? <Login /> : null}
			</Box>
		</Header>
    );
  }
}

export default Navbar;
