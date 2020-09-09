import React, {Component} from 'react'; 

class PokemonCard extends Component {
  render() {
    return (
      <div id={`pokemon-${this.props.id}`} className="four wide computer three wide tablet column">
        <div className="ui fluid card">
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PokemonCard; 