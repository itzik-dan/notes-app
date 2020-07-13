import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from 'axios';

const CreateNote = props => {

  const [isExpanded, setExpanded] = useState(false)

  const [note, setNote] = useState({
    username: "",
    content: "",
    date: ""
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  const submitNote = event => {
    props.onAdd(note);
    console.log(note)
    axios.post('/notes/add', note)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err));


    setNote({
      username: "",
      content: "",
      date:""
    });
    event.preventDefault();
  }

  const expand =() => {
    setExpanded(true)
  }

  return (
    <div>
      <form className="create-note">
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Create Assignment"
          rows={isExpanded ? 3 : 1}
          required
        />
        {isExpanded && <input
          name="username"
          onChange={handleChange}
          value={note.username}
          placeholder="User Name (required)"
        />}
        {isExpanded && <input
          name="date"
          onChange={handleChange}
          value={note.date}
          placeholder="Due Date (required)"
        />}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom> 
      </form>
    </div>
  );
}

export default CreateNote;
