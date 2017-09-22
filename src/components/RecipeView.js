import React, { Component } from 'react';
import '../App.css';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';

class RecipeView extends Component {
	
	openRecipe(URL) {
		window.open(URL);
	}
	
  render() {
	const { recipes } = this.props;
    return (
	  <Box>
		<Tiles selectable={true}>
		  {recipes.map((recipe, i) => (
		    <Tile key={i} onClick={() => this.openRecipe(recipe.link)} >
			  <Card thumbnail={recipe.picture}
				heading={recipe.name}
				label={recipe.label}
				description={recipe.description}
			  />
			</Tile>
		  ))}
	  </Tiles>
	  </Box>
    );
  }
}

export default RecipeView;
