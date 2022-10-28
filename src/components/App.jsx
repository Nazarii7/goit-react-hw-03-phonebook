import React, { Component } from 'react';
import shortid from 'shortid';
import Form from './FormUser/FormUsers';
import ContactList from './ContactList/ListUsers';
import FilterUser from './Filter/FilterUser';
// import PropTypes from 'prop-types';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactItem = localStorage.getItem('contacts');
    if (contactItem !== null) {
      this.setState({ contacts: JSON.parse(contactItem) });
    }
  }

  componentDidUpdate(_, prevState) {
    const nextState = this.state.contacts;
    if (prevState.contacts !== nextState) {
      localStorage.setItem('contacts', JSON.stringify(nextState));
    }
  }

  addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already is contacts`);
      return false;
    }
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
    return true;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div
        style={{
          width: '1000px',
          margin: '0 auto',
          padding: '0 50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'antiquewhite',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <div>
          <FilterUser value={filter} onChange={this.changeFilter} />
          <ContactList
            filteredContacts={this.getFilteredContacts()}
            onRemove={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
