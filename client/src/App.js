import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateNote from "./components/CreateNote";
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = newNote => {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  const deleteNote = id => {
    axios.delete('/notes/'+id)
      .then(response => { console.log(response.data)});
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }  

  // when app component is mounted the below function will display all the notes from database
  useEffect(() =>{
    axios.get('/notes')
      .then(response => {
        setNotes(response.data)
      })
      .catch((error) => {
        console.log(error);
      })

  })

  return (
    <div>
      <Header />
        <CreateNote onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              date={noteItem.date}
              content={noteItem.content}
              username= {noteItem.username}
              onDelete={deleteNote}
            />
          );
        })}
   </div>     
    
    );  
}

export default App;
