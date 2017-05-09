import React, { Component } from 'react';
import SecretSantaMatchesTable from './SecretSantaMatchesTable';
import SearchBar from './SearchBar';
import logo from '../img/logo.png';
import '../css/App.css';
import Users from '../json/users.json';
import { pluck, isEmpty, findWhere } from 'underscore';

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
      filteredSecretSantas: [],
      showMatches: false,
    };
    this.assignSecretSantas = this.assignSecretSantas.bind(this);
    this.maybeShowMatchesTable = this.maybeShowMatchesTable.bind(this);
    this.maybeShowSearchBar = this.maybeShowSearchBar.bind(this);
    this.refineSearch = this.refineSearch.bind(this);
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
      filteredSecretSantas: matches,
      showMatches: true,
    })
  }

  maybeShowSearchBar() {
    const { showMatches } = this.state;
    if (showMatches) {
      return (
        <SearchBar
          refineSearch={this.refineSearch}
        />
      );
    }
  }

  maybeShowMatchesTable() {
    const { showMatches, filteredSecretSantas } = this.state;
    if(showMatches) {
      return (
        <SecretSantaMatchesTable
          participants={Users.users}
          secretSantas={filteredSecretSantas}
        />
      )
    }
    return null;
  }

  refineSearch({ target: { value } }) {
    const { assignedSecretSantas } = this.state;
    if(!isEmpty(value)) {
      const filteredSecretSantas = assignedSecretSantas.filter(secretSanta => {
        const giver = findWhere(Users.users, { guid: secretSanta.giver });
        const name = `${giver.name.first} ${giver.name.last}`.toLowerCase();
        return name.includes(value.toLowerCase());
      });
      this.setState({ filteredSecretSantas });
    } else {
      this.setState({ filteredSecretSantas: assignedSecretSantas });
    }
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
          {this.maybeShowSearchBar()}
          {this.maybeShowMatchesTable()}
        </div>
      </div>
    );
  }
}

export default App;
