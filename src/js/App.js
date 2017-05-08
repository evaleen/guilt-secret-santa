import React, { Component } from 'react';
import SecretSantaMatchesTable from './SecretSantaMatchesTable';
import logo from '../img/logo.png';
import '../css/App.css';
import Users from '../json/users.json';
import { pluck } from 'underscore';

const buttonTexts = {
  ASSIGN: 'Assign Secret Santas',
  REASSIGN: 'Reassign Secret Santas'
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      buttonText: buttonTexts.ASSIGN,
      assignedSecretSantas: [],
      showMatches: false,
    };
    this.assignSecretSantas = this.assignSecretSantas.bind(this);
    this.maybeShowMatchesTable = this.maybeShowMatchesTable.bind(this);
  }

  assignSecretSantas() {
    const matches = [];
    let possibleReceivers = pluck(Users.users, 'guid');
    Users.users.forEach((user, index) => {
      const availableReceivers = possibleReceivers.filter(guid => {
        return guid !== user.guid
      });
      const randomMatchIndex = Math.floor(Math.random() * availableReceivers.length)
      const randomMatch = availableReceivers[randomMatchIndex];
      matches.push({
        giver: user.guid,
        receiver: randomMatch
      });
    possibleReceivers.splice(possibleReceivers.indexOf(randomMatch), 1);
    });
    this.setState({
      buttonText: buttonTexts.REASSIGN,
      assignedSecretSantas: matches,
      showMatches: true,
    })
  }

  maybeShowMatchesTable() {
    const { showMatches, assignedSecretSantas } = this.state;
    if(showMatches) {
      return (
        <SecretSantaMatchesTable
          participants={Users.users}
          assignedSecretSantas={assignedSecretSantas}
        />
      )
    }
    return null;
  }

  render() {
    const { buttonText } = this.state;
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1>Secret Santa!</h1>
        </div>
        <div className="app-content">
          <button
            className="assign-button"
            onClick={this.assignSecretSantas}
          >
            {buttonText}
          </button>
          {this.maybeShowMatchesTable()}
        </div>
      </div>
    );
  }
}

export default App;
