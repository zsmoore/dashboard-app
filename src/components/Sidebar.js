import React, { Component } from 'react';
import '../App.css';
import GrommetSidebar from 'grommet/components/Sidebar';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import CheckBox from 'grommet/components/CheckBox';


class Sidebar extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      library: ['ing 1', 'search 2', '3rd ingredient'],
      inventory: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3']
    }
    this._select = this._select.bind(this);
  }
  
  _select(suggestion, selected) {
    console.log(`selection ${suggestion}`);
    console.log(`selected ${selected}`);
    if(selected) {
      const { library, inventory} = this.state;
      const i = library.indexOf(suggestion);
      if (i >= 0) {
        library.splice(i,1);
        inventory.unshift(suggestion);
      } 
      this.setState({ library, inventory });
    }
  }

  render() {
    const { library, inventory} = this.state;
    return (
      <GrommetSidebar size='small' separator='all'>
        <Title align='center'>Ingredients</Title>
        <Search
          inline={true} suggestions={library}
          onSelect={({ suggestion }, selected) => this._select(suggestion, selected)}
        />
        <List>
          {inventory.map((ing, i) => <ListItem key={i}><CheckBox/>{ing}</ListItem>)}
        </List>
      </GrommetSidebar>
    );
  }
}

export default Sidebar;
