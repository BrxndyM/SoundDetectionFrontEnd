import React, { useState, useEffect } from 'react';
import './style.css';

type Contact = {
  id: number;
  name: string;
  number: string;
};

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    // Retrieve contacts from local storage on component mount
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    // Update local storage when contacts change
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleSave = () => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      number,
    };

    setContacts([...contacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleDelete = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleNext = () => {
    window.location.href = '/message';
    // Handle the next button click
    // You can navigate to the next page or perform any desired action
    console.log('Next button clicked');
  };

  return (
    <div className="contact-list-container">
      <h2>Add Contacts to Alert in Case of an Emergency</h2>

      <form className="contact-form">
        <label className="label">
          Name:
          <input type="text" value={name} onChange={handleNameChange} className="input" />
        </label>
        <br />
        <label className="label">
          Number:
          <input type="text" value={number} onChange={handleNumberChange} className="input" />
        </label>
        <br />
        <button type="button" onClick={handleSave} className="button">
          Save
        </button>
      </form>

      <h3>Contacts:</h3>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              {contact.name} - {contact.number}
              <button type="button" onClick={() => handleDelete(contact.id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="next-button-container">
        <button type="button" onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactList;

