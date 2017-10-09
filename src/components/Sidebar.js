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
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';

function getListItems(inventory, selected, select, remove) {
  return inventory.map((ing, i) => (
    <ListItem key={i} pad='none'>
      <Box style={{ width: '85%' }}>
        <CheckBox
          label={ing.name} checked={selected.indexOf(ing) >= 0} onChange={() => select(ing)}
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
      <Box style={{ width: '20%' }} separator='right'>
        <Header justify='center' size='small'><Title>Ingredients</Title></Header>
        <Search
          inline={true} suggestions={suggestions.map(food => food.name)}
          onSelect={({ suggestion }, selected) => add(suggestion, selected)}
          onDOMChange={(event) => getSuggestions(event)} value={search}
        />
        <Box>
          <List>
            {getListItems(inventory, selected, select, remove)}
          </List>
        </Box>
        <Footer justify='center' pad='small' >
          <Button style={{ backgroundColor: '#FDC92B', borderColor: '#FDC92B'}} label='Find Recipes' onClick={() => findRecipes(selected)} primary={true} />
        </Footer>
      </Box>  
    );
  }
}

export default Sidebar;
