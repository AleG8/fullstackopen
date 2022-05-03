import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteServices from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br/>
            <em>Note app, Department of Computer Science, University My Home 108</em>
        </div>
    )
}

const App = () => {
    
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        noteServices.getAll()
        .then(allNotes => {
            console.log('promise fulfilled')
            setNotes([...allNotes, {content: 'test notee'}])
          })
      }, [])

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        };

        noteServices
        .create(noteObject)
            .then(noteCreated => {
                setNotes(notes.concat(noteCreated))
                setNewNote('')
        })
    }

    const handleNoteChange = (event) =>{
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        
        noteServices
        .update(id, changedNote)
        .then(noteUpdated => {
          setNotes(notes.map(note => note.id !== id ? note : noteUpdated))
        })
        .catch((error) => {
            setErrorMessage(
                `Note ${note.content} was already removed from server`
            );
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000);

            setNotes(notes.filter(n => n.id !== id))
        })
      }

    const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important);

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            <div>
                <button onClick={()=> setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note, i)=> (
                    <Note 
                    key={i} 
                    note={note} 
                    toggleImportance={()=> toggleImportanceOf(note.id)}/>
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type='submit'>save</button>
            </form>
            <Footer/>
        </div>
    )
}

export default App