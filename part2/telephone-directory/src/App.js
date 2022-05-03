import { useState, useEffect } from 'react'
import telephoneService from './services/telephones'
import FilterList from './components/FilterList'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Input from './components/Input'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({content: null, type: true});

  const displayNotification = (content, type) => {
    setNotificationMessage({...notificationMessage, content, type})
    setTimeout(() => {
      setNotificationMessage({...notificationMessage, content: null})
    }, 3000);
  }

  useEffect(() => {
    telephoneService
      .getAll()
      .then(allTelephones => setPersons(allTelephones))
  }, [])

  const addPerson = (event) =>{
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber }
    const personAdded = persons.find(person => person.name === newPerson.name);

    if(!personAdded) {
      return telephoneService
              .create(newPerson)
              .then(personCreated => {
                displayNotification(`${personCreated.name} added to phonebook`, true)
                setPersons(persons.concat(personCreated))
              })
    }

    let userAgreeToReplace = window.confirm(
      `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
    )

    if(userAgreeToReplace) {
      return telephoneService
              .update(personAdded.id, newPerson)
              .then(personUpdated => {
                displayNotification(`Replaced the old number of ${personUpdated.name}`, true)
                setPersons(
                  persons.map(person => person.id !== personUpdated.id ? person : personUpdated)
                )
              })
              .catch(error => 
                displayNotification(`Information of ${newPerson.name} has already been removed from server`, false)
                )
    }
    
  }

  const handleInputName = ({target}) =>{
    setNewName(target.value)
  }

  const handleInputNumber = ({target}) =>{
    setNewNumber(target.value)
  }

  const handleInputFilter = ({target}) =>{
    setNameFilter(target.value)
  }

  const handleDeletePerson = (id, name) => {
    let eliminationAccepted = window.confirm(`Delete ${name} ?`)

    if(!eliminationAccepted) return

    telephoneService
    .deletePerson(id)
    .then(personDeleted => {
      displayNotification('Person successfully removed', false)
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => 
      displayNotification(`The selected person's information has already been deleted from the server.`, false)
      )
  }

  return (

    <div>
        <h1>Phonebook</h1>

        <Notification message={notificationMessage}/>

        <h2>Add new number</h2>

        <PersonForm 
        handles={[addPerson, handleInputName, handleInputNumber]}
        values={[newName, newNumber]}
        />

        <br />

        <Input 
        value={nameFilter} 
        handleChange={handleInputFilter} 
        text='Filter shown with'/>

        <h2>Numbers</h2>
        <FilterList 
        elements={persons} 
        keyFilter={nameFilter}
        handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App