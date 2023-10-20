import { useEffect, useState } from 'react';
import Select from 'react-select';
import '../styles/create.css';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';
import { Timestamp } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

function Create() {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState('');
  const [formError, setFormError] = useState(null);
  const [users, setUsers] = useState([]);

  const { user } = useAuthContext();
  const { documents } = useCollection('users');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category');
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least one person');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.data.displayName,
        id: user.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy: createdBy,
      assignedUsersList,
    };

    await addDoc(collection(db, 'projects'), {
      project,
    });

    navigate('/');
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.data.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </label>
        <label>
          <span>Project Details</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Project Due Date</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          ></input>
        </label>
        <label>
          <span>Project Category</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assigned To</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default Create;
