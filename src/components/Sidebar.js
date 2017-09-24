import React, { Component } from 'react';
import '../App.css';
import GrommetSidebar from 'grommet/components/Sidebar';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import CheckBox from 'grommet/components/CheckBox';
import CloseIcon from 'grommet/components/icons/base/Close';
import Box from 'grommet/components/Box';

class Sidebar extends Component {

  render() {
    const { library, inventory, selected, select, add, findRecipes, remove } = this.props;
    const suggestions = [];
    library.forEach((food) => {
      if(inventory.indexOf(food) < 0){
        suggestions.push(food);
      }
    });
    const listItems = inventory.map((ing, i) => (
      <ListItem key={i} pad='none'>
        <Box style={{ width: '85%' }}>
          <CheckBox label={ing}
            checked={selected.indexOf(ing) >= 0} onChange={() => select(ing)}
          />
        </Box>
        <Button box={true} justify='end' icon={<CloseIcon size='xsmall'/>}
          onClick={() => remove(i)}
        />
      </ListItem>
    ));
    return (
      <Box style={{width:'20%'}} separator='all'>
        <Title align='center'>Ingredients</Title>
        <Search
          inline={true} suggestions={suggestions}
          onSelect={({ suggestion }, selected) => add(suggestion, selected)}
        />
        <Button label='Find Recipes' onClick={() => findRecipes()}/>
        <List>{ listItems }</List>
        <Button label='Remove Selected Ingredients' onClick={() => remove(-1)}/>
      </Box>
    );
  }
}

export default Sidebar;
