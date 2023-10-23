import React from 'react';
import { useState } from 'react';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
import { v4 } from 'uuid';
import { db } from '../firebase/firebaseconfig';
import '../styles/project.css';

function ProjectComments({ project }) {
  const [comment, setComment] = useState('');

  const { user } = useAuthContext();
  const uuid = v4;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      displayName: user.displayName,
      content: comment,
      createdAt: Timestamp.fromDate(new Date()),
      id: uuid(),
    };

    //this is wheere I left off - setting new comment for a post from a user
    console.log(project.id);
    const docRef = doc(db, 'projects', project.id);
    await updateDoc(docRef, {
      comments: [...project.comments, newComment],
    });
    console.log(newComment);
    setComment('');
  };

  return (
    <div className="project-comments">
      <h4>Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => {
            return (
              <li key={comment.id}>
                <div className="comment-author">
                  {comment.displayName}
                  {/* <p className="comment-date"> {comment.createdAt}</p> */}
                </div>
                <div className="comment-date">
                  <p>date here</p>
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </li>
            );
          })}
      </ul>
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
