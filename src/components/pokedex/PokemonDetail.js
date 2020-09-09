
import React, {Component} from 'react'; 
import pokeapi from '../../api/pokeapi';

class PokemonDetail extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      pokemon: {},
      name: "",
      description: "", 
      speciesUrl: "",
      imageUrl: "",
      types: [],
      stats: []
    }
    this.renderPokemon = this.renderPokemon.bind(this);
    this.renderPokemonTypes = this.renderPokemonTypes.bind(this); 
    this.renderPokemonStats = this.renderPokemonStats(this);  
  }

  componentDidMount() {
    const pokeId = this.props.match.params.id;
    pokeapi.get(`/pokemon/${pokeId}`)
      .then(response => {
        this.fetchDescription(); 
        this.setState({
          pokemon: {...response.data}, 
          name: response.data.name,
          speciesUrl: response.data.species.url,
          imageUrl: response.data.sprites.front_default,
          types: [...response.data.types],
          stats: [...response.data.stats]
        });
      });
  }

  fetchDescription() {
     pokeapi.get(`pokemon-species/${this.props.match.params.id}`)
      .then(response => {
        this.setState({description: response.data.flavor_text_entries[1].flavor_text}); 
      });
  }

  renderPokemonTypes() {

  }

  renderPokemonStats() {

  }

  renderPokemon() {
    const pokemon = this.state;
    if(!this.state.name){
      return null
    }
    return (
      <React.Fragment>
      <div className="ui top attached secondary menu" style={{background: 'rgba(0,0,0,.03)'}}>
        <div className="menu">
          <div className="item">
            <h3>{pokemon.pokemon.id}</h3>
          </div>
        </div>
        <div className="right menu">
          <div className="item">
            
          </div>
        </div>
      </div>
      <div className="ui bottom attached segment" style={{padding: '20px'}}>
        <div className="ui two column grid">
          <div className="four wide computer four wide tablet six wide mobile column">
            <img src={pokemon.imageUrl} alt={`${pokemon.name}.png`} style={{width: '100%'}}/>
          </div>
          <div className="twelve wide computer twelve wide tablet ten wide mobile column">
            <div className="content">
              <h2>{pokemon.name}</h2>
            </div>
          </div>
        </div>
        <div className="ui content">
          <p>{pokemon.description}</p>
        </div>
      </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="ui container">
        {this.renderPokemon()}
      </div>
    );
  }
}

export default PokemonDetail; 