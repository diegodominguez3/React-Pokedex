
import React, {Component} from 'react'; 
import pokeapi from '../../api/pokeapi';

const TYPE_COLORS = {
  bug: '#B1C12E',
  dark: '#4F3A2D',
  dragon: '#755EDF',
  electric: '#FCBC17',
  fairy: '#F4B1F4',
  fighting: '#823551D',
  fire: '#E73B0C',
  flying: '#A3B3F7',
  ghost: '#6060B2',
  grass: '#74C236',
  ground: '#D3B357',
  ice: '#A3E7FD',
  normal: '#C8C4BC',
  poison: '#934594',
  psychic: '#ED4882',
  rock: '#B9A156',
  steel: '#B5B5C3',
  water: '#3295F6'
};


class PokemonDetail extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      pokemon: null,
      name: "",
      description: "",
      height: 0,
      weight: 0,
      imageUrl: "",
      types: [],
      stats: [],
      captureRate: 0,
      eggGroups: [],
      habitat: "",
      abilities: []

    }
    this.renderPokemon = this.renderPokemon.bind(this);
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
          stats: [...response.data.stats],
          height: response.data.height,
          weight: response.data.weight,
          abilities: [...response.data.abilities]
        });
      });
  }

  fetchDescription() {
     pokeapi.get(`pokemon-species/${this.props.match.params.id}`)
      .then(response => {
        response.data.flavor_text_entries.some(flavor =>{
          if(flavor.language.name === 'en') {
            this.setState({
              description: flavor.flavor_text,
            }); 
          }
          this.setState({
            captureRate: response.data.capture_rate,
            eggGroups: response.data.egg_groups,
            habitat: response.data.habitat.name
          })

          return 0;
        });
      });
  }

  renderPokemonTypes() {
    return (
      this.state.types.map(el => {
        return (
          <React.Fragment>
          <div className="ui label" style={{backgroundColor: TYPE_COLORS[el.type.name], borderColor: TYPE_COLORS[el.type.name]}}>
            {el.type.name}
          </div>
          </React.Fragment>
        );
      })
    );
  }

  renderPokemonStats() {
    const stats = this.state.stats;
    const barColor = TYPE_COLORS[this.state.types[0].type.name]; 
    return (
      stats.map(el => {
        return (
          <React.Fragment>
            <div className="four wide column" style={{padding: '5px 0'}}>
              <b>{el.stat.name}</b>
            </div>
            <div className="twelve wide column" style={{padding: '5px 0'}}>
              <div className="ui progress" 
                   style={{margin: 0}}>
                <div className="bar" 
                style={{backgroundColor: barColor, width: `${el.base_stat > 100 ? 100 : el.base_stat}%`}}>
                <div style={{color: 'white', lineHeight: '24.5px', textAlign: 'right', paddingRight: '10px'}}><b>{el.base_stat}</b></div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })
    );
  }
  renderEggGroups (){
    return (
      this.state.eggGroups.map(group => {
        return (
          <div className="item">{group.name}</div>
        ); 
      })
    );
  }

  renderAbilities () {
    return (
      this.state.abilities.map(el => {
        return (
          <div className="item">{el.ability.name}</div>
        ); 
      })
    );
  }

  renderProfile() {
    const pokemon = this.state;
    return (
      <div className="ui stackable two column grid" style={{marginTop: '10px'}}>
        <div className="eight wide column">
          <div className="ui relaxed divided list">
            <div className="item">
              <div className="ui horizontal large label">Height:</div>
              {`${pokemon.height} ft`}  
            </div>
            <div className="item">
              <div className="ui horizontal large label">Weight:</div>
              {`${pokemon.weight} lbs`}  
            </div>
            <div className="item">
              <div className="ui horizontal large label">Habitat:</div>
              {pokemon.habitat}  
            </div>
          </div>
        </div>
        <div className="eight wide column">
        <div className="ui relaxed divided list">
            <div className="item">
              <div className="ui horizontal large label">Capture Rate:</div>
              {pokemon.captureRate}  
            </div>
            <div className="item">
              <div className="ui horizontal large label">Egg Groups:</div>
              <div className="ui list"  style={{display: "inline-grid", padding: '0'}}>
                {this.renderEggGroups()}
              </div>
            </div>
            <div className="item">
              <div className="ui horizontal large label">Abilites:</div>
              <div className="ui list"  style={{display: "inline-grid", padding: '0'}}>
                {this.renderAbilities()}
              </div>
            </div>
          </div>
        </div>
        <div className="eight wide column">
          
        </div>
      </div>
    );
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
        <div className="item">{this.renderPokemonTypes()}</div>
        </div>
      </div>
      <div className="ui bottom attached segment" style={{padding: '20px'}}>
        <div className="ui stackable two column grid">
          <div className="four wide computer five wide tablet six wide mobile column">
            <img src={pokemon.imageUrl} alt={`${pokemon.name}.png`} style={{width: '100%'}}/>
          </div>
          <div className="twelve wide computer eleven wide tablet ten wide mobile column">
            <div className="content">
              <h2>{pokemon.name}</h2>
              <div className="ui stackable two column grid" style={{margin: '0'}}>
                {this.renderPokemonStats()}
              </div>
            </div>
          </div>
        </div>
        <div className="ui grid">
          <div className="sixteen wide column">
            <p>{pokemon.description}</p>
          </div>
        </div>
      </div>
      <div className="ui segment" style={{padding: '20px'}}>
        <div className="title"><h2>Profile</h2></div>
        {this.renderProfile()}
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