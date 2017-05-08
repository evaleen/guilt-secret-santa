import React, { Component } from 'react';

import SecretSantaMatch from './SecretSantaMatch';
import '../css/SecretSantaMatchesTable.css';

import { findWhere } from 'underscore';

class SecretSantaMatchesTable extends Component {

  renderMatches() {
    const { participants, assignedSecretSantas } = this.props;
    const matchesList = [];
    participants.forEach((participant, index) => {
      const match = findWhere(assignedSecretSantas, { giver: participant.guid });
      const receiver = findWhere(participants, { guid: match.receiver });
      matchesList.push(
        <SecretSantaMatch
          key={index}
          giverName={participant.name}
          receiver={receiver}
        />
      );
    });
    return (
      <div>
        {matchesList}
      </div>
    );
  }

  render() {
    const matches = this.renderMatches();
    return (
      <div className="matches-table">
        {matches}
      </div>
    );
  }
}
SecretSantaMatchesTable.propTypes = {
  participants: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      guid: React.PropTypes.string.isRequired,
      name: React.PropTypes.shape({
        first: React.PropTypes.string.isRequired,
        last: React.PropTypes.string.isRequired
      }).isRequired,
      email: React.PropTypes.string.isRequired,
      phone: React.PropTypes.string.isRequired
    })
  ).isRequired,
  assignedSecretSantas: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      giver: React.PropTypes.string.isRequired,
      receiver: React.PropTypes.string.isRequired
    })
  ).isRequired,
}
export default SecretSantaMatchesTable;
