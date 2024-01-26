import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NotePage = () => {
  const { id: noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
      const response = await fetch(`/api/notes/${noteId}/`);
      const data = await response.json();
      setNote(data);
    };

    getNote();
  }, [noteId]);
  
  return (
    <div>
      {note ? <p>{note.body}</p> : <p>Loading...</p>}
    </div>
  );
};

export default NotePage;
