//hooks and react components
import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
//styles
import '../styles/create.css';
//firebase functions
import { Timestamp } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

const categories = [
  { value: 'synthetikeis', label: 'Synthetikeis' },
  { value: 'football', label: 'Football' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'operations', label: 'Operations' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'clients', label: 'Clients' },
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
        displayName: user.value.displayName,
        id: user.value.id,
      };
    });

    await addDoc(collection(db, 'projects'), {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy: createdBy,
      assignedUsersList,
    });

    navigate('/');
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="create-proj-form">
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
