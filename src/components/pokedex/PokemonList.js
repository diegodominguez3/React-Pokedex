import React, {Component} from 'react'; 
import pokeapi from '../../api/pokeapi'; 
import PokemonCard from './PokemonCard';

class PokemonList extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      pokemons: [],
      fetched: false
    };
    this.renderPokemons = this.renderPokemons.bind(this); 
  }

  componentDidMount() {
    pokeapi.get('/pokemon?limit=151')
      .then(response => {
        this.setState({
          pokemons: [...response.data.results],
          loading: true, 
          fetched: true
        })
      });
  }
  
  renderPokemons() {
    if(!this.state.fetched) {
      return <div>Loading...</div>
    }
    return (
      this.state.pokemons.map((pokemon, index) => {
        console.log(pokemon.name)
        return (
          <PokemonCard
            key={pokemon.name}
            id={index}
            pokemon={pokemon}
          />
        );
      })
    );
  }

  render() {
    console.log(this.state.pokemons)
    return (
      <div className="ui container">
        <div className="ui grid">
          {this.renderPokemons()}
        </div>
      </div>
    ); 
  }
}

export default PokemonList; 