import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';


const Note = props => {


  const handleClick = () => {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1><em>Due Date:</em> {props.date}</h1>
      <hr />
      <br />
      <p><em>Conetnt:</em> {props.content}</p>
      <hr />
      <p><em>Posted by:</em> {props.username}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
