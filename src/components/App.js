import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'; 
import Header from './Header';
import PokemonList from './pokedex/PokemonList';  
import PokemonDetail from './pokedex/PokemonDetail';  

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact component={PokemonList}/>
            <Route path="/pokemon/:id" component={PokemonDetail}/>
          </Switch>
        </Router>
      </div>
    ); 
  }
}

export default App; 