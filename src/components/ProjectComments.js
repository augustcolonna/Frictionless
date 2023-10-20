import React from 'react';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
import { v4 } from 'uuid';

function ProjectComments() {
  const [comment, setComment] = useState('');

  const { user } = useAuthContext();
  const uuid = v4;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      displayName: user.displayName,
      content: comment,
      createdAt: Timestamp.fromDate(new Date()),
      id: uuid,
    };

    console.log(newComment);
  };

  return (
    <div className="project-Comments">
      <h4>Comments</h4>
      <form onSubmit={handleSubmit} className="add-comments">
        <label>
          <span>Add new comment</span>

          <textarea
            required
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}

export default ProjectComments;
