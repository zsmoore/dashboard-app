import React, { Component } from 'react';
import '../App.css';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';

class RecipeView extends Component {
	openRecipe(URL) {
		window.open(URL);
	}
  render() {
  	const recipes = ['Mozzarella Sticks', 'Butter Chicken', 'Steak', 'Pizza'];
  	const pictures = ['http://img.sndimg.com/food/image/upload/h_465,w_620,c_fit/v1/img/recipes/30/97/7/rCPq9e9QCuke3PYJclYM_mfood1.jpg', 'http://img.taste.com.au/qDjJh8W8/taste/2016/11/butter-chicken-101831-1.jpeg', 'http://www.seriouseats.com/recipes/assets_c/2015/05/Anova-Steak-Guide-Sous-Vide-Photos15-beauty-thumb-1500xauto-423558.jpg', 'http://img.taste.com.au/WCevy9kv/w720-h480-cfill-q80/taste/2016/11/pizza-bianca-75328-1.jpeg']
    return (
      <Tiles fill={true}
  selectable={true}>
  <Tile
  onClick={() => this.openRecipe('http://www.geniuskitchen.com/recipe/mozzarella-sticks-30977')} >
    <Card thumbnail={pictures[0]}
      heading={recipes[0]}
      label='EASY'
      description='"Awesome...I never thought mozzarella sticks would turn out so good..."' />
  </Tile>
  <Tile 
  onClick={() => this.openRecipe('http://www.taste.com.au/recipes/butter-chicken-13/b0f6220e-65e9-48b3-b4d8-c1b88949c5db')} >
    <Card thumbnail={pictures[1]}
      heading={recipes[1]}
      label='MEDIUM'
      description='"Not only tastes fantastic but makes the kitchen smell delightful at the same time."' />
  </Tile>
  <Tile
  onClick={() => this.openRecipe('http://www.seriouseats.com/recipes/2010/03/sous-vide-steaks-recipe.html')} >
    <Card thumbnail={pictures[2]}
      heading={recipes[2]}
      label='HARD'
      description='"Worked like a charm, will definitely make them again..."' />
  </Tile>
  <Tile
  onClick={() => this.openRecipe('http://www.taste.com.au/recipes/pizza-bianca/c369d89b-81f7-44d9-89d3-6eca3d6fec99')} >
    <Card thumbnail={pictures[3]}
      heading={recipes[3]}
      label='EASY'
      description='"We love this pizza as a starter. Great flavours."' />
  </Tile>
</Tiles>
    );
  }
}

export default RecipeView;
