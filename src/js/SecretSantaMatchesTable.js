import React, { Component } from 'react';
import '../css/SecretSantaMatchesTable.css';

class SecretSantaMatchesTable extends Component {

  render() {
    const { participants, assignedSecretSantas } = this.props;
    return (
      <div className="matches-table">
      </div>
    );
  }
}
SecretSantaMatchesTable.propTypes = {
  participants: React.PropTypes.array.isRequired,
  assignedSecretSantas: React.PropTypes.array.isRequired
}
export default SecretSantaMatchesTable;
