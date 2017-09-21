import React, { Component } from 'react';

import '../App.css';
import '../../node_modules/grommet-css'


import Navbar from './NavBar';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';

import GrommetApp from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Header from 'grommet/components/Header';
import Image from 'grommet/components/Image';
import Section from 'grommet/components/Section';

import logo from '../logo.svg';

class App extends Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <Header>
          <Image size='small' src={logo} />
          <Headline>Welcome to React with Grommet</Headline>
        </Header>
        <Article direction='row'>
          <Sidebar></Sidebar>
          <Section style={{ width: '80%' }}><RecipeView /></Section>
        </Article>
      </GrommetApp>
    );
  }
}

export default App;
