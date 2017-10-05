import { GET_RECIPES, GET_USER } from './';

export function logout(username, password) {
  const user = undefined;
  return { type: GET_USER, payload: { user } };
}

export function login(username, password) {
  const user = { username, password, inventory: ['Steak', 'Chicken', 'Mozzarella'] };
  return { type: GET_USER, payload: { user } };
}

export function findRecipes(selected) {
  const recipes = selected.length > 0 ? [] : [{ name: 'Mac n\' Cheese', label:'EASY',
    description: '"Best mac n\' cheese I\'ve ever tasted"',
    link: 'https://thecountrycontessa.com/baked-macaroni-cheese/',
    picture: 'http://thecountrycontessa.com/wp-content/uploads/2013/12/macandcheese-e1386863252659.jpg'
    }, { name: 'Ground Beef Tacos', label:'EASY',
    description: '"Worked like a charm, will definitely make them again..."',
    link: 'https://www.pillsbury.com/recipes/ground-beef-tacos/7217b5cb-5bdc-4458-a6e4-844a39188b9c',
    picture: 'https://images-gmi-pmc.edge-generalmills.com/287350ad-0c09-4d72-be5b-b7505b2cba80.jpg'
    }, {name: 'Chicken Wing Dip', label:'MEDIUM',
    description: '"Perfect for game day!"',
    link: 'http://www.geniuskitchen.com/recipe/buffalo-chicken-wing-dip-116266',
    picture: 'http://img.sndimg.com/food/image/upload/w_966,h_483,c_fill,fl_progressive,q_92/v1/img/recipes/11/62/66/picBeJt2K.jpg'
  }];
  if (selected.indexOf('Steak') >= 0) {
    recipes.push({name: 'Steak', label:'HARD',
      description: '"Absolutely delicious."',
      link: 'http://www.seriouseats.com/recipes/2010/03/sous-vide-steaks-recipe.html',
      picture: 'http://www.seriouseats.com/recipes/assets_c/2015/05/Anova-Steak-Guide-Sous-Vide-Photos15-beauty-thumb-1500xauto-423558.jpg'
    });
  }
  if (selected.indexOf('Chicken') >= 0) {
    recipes.push({name: 'Butter Chicken', label:'MEDIUM',
      description: '"Not only tastes fantastic, but makes the kitchen smell delightful at the same time."',
      link: 'http://www.taste.com.au/recipes/butter-chicken-13/b0f6220e-65e9-48b3-b4d8-c1b88949c5db',
      picture: 'http://img.taste.com.au/XsMVNAFm/w720-h480-cfill-q80/taste/2016/11/butter-chicken-101831-1.jpeg'
    });
  }
  if (selected.indexOf('Mozzarella') >= 0) {
    recipes.push({name: 'Mozzarella Sticks', label:'EASY',
      description: '"Awesome...I never thought mozzarella sticks would turn out so good..."',
      link: 'http://www.geniuskitchen.com/recipe/mozzarella-sticks-30977',
      picture: 'http://img.sndimg.com/food/image/upload/h_465,w_620,c_fit/v1/img/recipes/30/97/7/rCPq9e9QCuke3PYJclYM_mfood1.jpg'
    });
    recipes.push({name: 'Pizza', label:'EASY',
      description: '"We love this pizza as a starter. Great flavours."',
      link: 'http://www.taste.com.au/recipes/pizza-bianca/c369d89b-81f7-44d9-89d3-6eca3d6fec99',
      picture: 'http://img.taste.com.au/WCevy9kv/w720-h480-cfill-q80/taste/2016/11/pizza-bianca-75328-1.jpeg'
    });
  }
  if (selected.indexOf('Mozzarella') >= 0 || selected.indexOf('Chicken') >= 0 || selected.indexOf('Parmesian') >= 0 || selected.indexOf('Fettuccine') >= 0 || selected.indexOf('Broccoli') >= 0) {
    recipes.push({name: 'Chicken Alfredo', label:'HARD',
      description: '"Outstanding.  I will never use store-bought sauce again!"',
      link: 'http://www.delish.com/cooking/recipe-ideas/recipes/a53695/one-pot-chicken-alfredo-recipe/',
      picture: 'http://del.h-cdn.co/assets/17/24/980x490/landscape-1497458683-delish-one-pot-chicken-alfredo-1-1024.jpg'
    });
  }
  return { type: GET_RECIPES, payload: { recipes } };
}