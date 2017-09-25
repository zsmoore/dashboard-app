import React, { Component } from 'react';
import '../App.css';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import CloseIcon from 'grommet/components/icons/base/Close';
import Box from 'grommet/components/Box';

function getListItems(inventory, selected, select, remove) {
  return inventory.map((ing, i) => (
    <ListItem key={i} pad='none'>
      <Box style={{ width: '85%' }}>
        <CheckBox
          label={ing} checked={selected.indexOf(ing) >= 0} onChange={() => select(ing)}
        />
      </Box>
      <Button box={true} justify='end' icon={<CloseIcon size='xsmall'/>}
        onClick={() => remove(i)}
      />
    </ListItem>
  ));
}

function getSuggestions(library, inventory) {
  return library.filter(food => inventory.indexOf(food) < 0);
}

class Sidebar extends Component {
  
  render() {
    const { library, inventory, selected, select, add, findRecipes, remove } = this.props;
    return (
      <Box style={{width:'20%'}} separator='all'>
        <Title align='center'>Ingredients</Title>
        <Search
          inline={true} suggestions={getSuggestions(library, inventory)}
          onSelect={({ suggestion }, selected) => add(suggestion, selected)}
        />
        <List>
          {getListItems(inventory, selected, select, remove)}
        </List>
        <Box align='center' pad='small' margin='small'>
        	<Button label='Find Recipes' onClick={() => findRecipes()} primary={true} />
        </Box>
      </Box>  
    );
  }
}

export default Sidebar;
