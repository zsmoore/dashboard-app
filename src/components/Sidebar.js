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

class Sidebar extends Component {
  
  render() {
    const { 
      inventory, selected, select, add, search,
      findRecipes, remove, getSuggestions, suggestions
    } = this.props;
    return (
      <Box style={{width:'20%'}} separator='all'>
        <Title align='center'>Ingredients</Title>
        <Search
          inline={true} suggestions={suggestions} value={search}
          onSelect={({ suggestion }, selected) => add(suggestion, selected)}
          onDOMChange={(event) => getSuggestions(event)}
        />
        <List>
          {getListItems(inventory, selected, select, remove)}
        </List>
        <Box align='center' pad='small' margin='small'>
        	<Button label='Find Recipes' onClick={() => findRecipes(selected)} primary={true} />
        </Box>
      </Box>  
    );
  }
}

export default Sidebar;
