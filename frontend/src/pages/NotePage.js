import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import arrowLeftImage from '../assets/arrow-left.png';

const NotePage = () => {
  const navigate = useNavigate();
  const { id: noteId } = useParams();
  const [note, setNote] = useState({ body: '' });

  useEffect(() => {
    const getNote = async () => {
      if (noteId === 'new') return;
  
      let response = await fetch(`/api/notes/${noteId}/`);
      let data = await response.json();
      setNote(data);
    };
  
    getNote();
  }, [noteId]);
  
  // let getNote = async () => {
  //   let response = await fetch(`/api/notes/${noteId}/`);
  //   let data = await response.json();
  //   setNote(data);
  // };

  let createNote = async () => {
    await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
  };

  let updateNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
  };

  let deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    });
  };

  let handleSubmit = async () => {
    if (noteId !== 'new' && note.body === '') {
      await deleteNote();
    } else if (noteId !== 'new') {
      await updateNote();
    } else if (noteId === 'new' && note.body !== '') {
      await createNote();
    }
    navigate('/');
  };

  let handleChange = (value) => {
    setNote((note) => ({ ...note, 'body': value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        <Link to="/">
          <img src={arrowLeftImage} alt="Back" />
        </Link>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea onChange={(e) => handleChange(e.target.value)} value={note.body}></textarea>
    </div>
  );
};

export default NotePage;
