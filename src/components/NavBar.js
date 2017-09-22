import React, { Component } from 'react';
import '../App.css';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Headline from 'grommet/components/Headline';

class Navbar extends Component {
  render() {
    return (
      <Header size='medium'>
		  <Headline margin='large'>
		    Who's Hungry?
		  </Headline>
		  <Box flex={true}
		    justify='end'
		    direction='row'
		    responsive={false}>
		    <Menu icon={<MenuIcon />}
		      dropAlign={{"right": "right"}}>
		      <Anchor href='#'
		        className='active'>
		        About
		      </Anchor>
		      <Anchor href='#'>
		        Contact
		      </Anchor>
		      <Anchor href='#'>
		        Log In
		      </Anchor>
		    </Menu>
		  </Box>
	</Header>
    );
  }
}

export default Navbar;
