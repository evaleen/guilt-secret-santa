import React, { Component } from 'react';
import '../css/SecretSantaMatch.css';

class SecretSantaMatch extends Component {

  formatName(name) {
    return <p>{name.first} {name.last}</p>
  }

  render() {
    const { giverName, receiver } = this.props;
    return (
      <div className="match">
        <div className="giver-name">
          {this.formatName(giverName)}
        </div>
        <p className="hover-message">Hover to see!</p>
        <div className="receiver-details">
        {this.formatName(receiver.name)}
        <p>{receiver.email}</p>
        <p>{receiver.phone}</p>
        </div>
      </div>
    );
  }
}
SecretSantaMatch.propTypes = {
  giverName: React.PropTypes.shape({
    first: React.PropTypes.string.isRequired,
    last: React.PropTypes.string.isRequired
  }).isRequired,
receiver: React.PropTypes.shape({
  guid: React.PropTypes.string.isRequired,
  name: React.PropTypes.shape({
    first: React.PropTypes.string.isRequired,
    last: React.PropTypes.string.isRequired
  }).isRequired,
  email: React.PropTypes.string.isRequired,
  phone: React.PropTypes.string.isRequired
}).isRequired,
}
export default SecretSantaMatch;
