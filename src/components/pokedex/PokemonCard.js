import defaultImage from '../../assets/img/0.png'
import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {imageLoaded: false}
    this.renderImage = this.renderImage.bind(this); 
  }

  renderImage() {
    return (
      this.state.imageLoaded ? this.props.image : defaultImage
    );
  }

  render() {
    return (
      <Link to={`/pokemon/${this.props.id}`}  id={`pokemon-${this.props.id}`} className="four wide computer five wide tablet eight wide mobile column">
        <div className="ui link fluid card">
          <div className="image">
          <img 
            style={{width: '80%', margin: '0 auto'}}
            src={this.renderImage()} 
            alt={this.props.pokemon.name}
            onLoad={() => this.setState({imageLoaded: true})}
            /> 
          </div>
          <div className="content">
            <div className="header" style={{textAlign: 'center'}}>{this.props.pokemon.name}</div>
          </div>
        </div>
      </Link>
    )
  }
}

export default PokemonCard; 