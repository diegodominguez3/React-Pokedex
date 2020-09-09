import logo from '../assets/img/pokedex-logo.png'
import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 

class Header extends Component { 
  constructor(props) {
    super(props);
    this.menuStyles = {backgroundColor: '#ef5350', borderRadius: '0'}
  }

  render() {
    return (
      <div className="ui top menu" style={this.menuStyles}>
        <Link to="/" className="item">
          <img src={logo} alt="pokedex-logo" style={{width: '105px'}}/>
        </Link>
        <div className="right menu">
          <Link to="/" className="item white"><b style={{color: 'white'}}>Back to List</b></Link>
        </div>
      </div>
    );
  }
}

export default Header; 