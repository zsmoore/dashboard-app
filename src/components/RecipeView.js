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
		<Box className='recipe--view' full='horizontal'>
			<Tiles selectable={false} flush={false}>
				{recipes.map((recipe, i) => (
					<Tile className='recipe--view--tile' key={i} size='small'
					  onClick={() => this.openRecipe(recipe.source)}
					>
						<Card thumbnail={recipe.image_url} textSize='small' label={recipe.title} />
				  </Tile>
				))}
			</Tiles>
		</Box>
    );
  }
}

export default RecipeView;
