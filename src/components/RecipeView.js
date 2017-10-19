import React, { Component } from 'react';
import '../App.css';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';

class RecipeView extends Component {
	
	/**
	 * re renders the page when props or state are updated
	 */
  render() {
	const { recipes } = this.props;
    return (
		<Box className='recipe--view' full='horizontal'>
			<Tiles selectable={false} flush={false}>
				{recipes.map((recipe, i) => (
					<Tile className='recipe--view--tile' key={i} size='small'
					  onClick={() => window.open(recipe.source)}
					>
						<Card thumbnail={recipe.image_url} textSize='small' label={<Label size='small'>{recipe.title}</Label>} />
				  </Tile>
				))}
			</Tiles>
		</Box>
    );
  }
}

export default RecipeView;
