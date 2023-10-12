// import { db } from "../firebase/firebaseconfig";
// import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
// import { useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";

// //CREATE
// function Create() {
//   const [newTask, setNewTask] = useState("");
//   const { user } = useAuthContext();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await addDoc(collection(db, "tasks"), {
//       name: newTask,
//       uid: user.uid, //associates tasks only created by this user id
//     });
//     setNewTask("");
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         placeholder="Add a new task"
//       />
//       <button type="submit">Add</button>
//     </form>
//   );
// }

// export default Create;

// //DELETE

// export default function taskList({tasks}) { //take in tasks from useCollection hook

// const handleClick = async (id) => {
//     const docRef = doc(db, 'tasks', id)

//     await deleteDoc(docRef)
// }

// return (
//     <div>
//         <ul>
//             {tasks.map((task) => (
//                 <li key={task.id}>
//                     <span>{task.name}</span>
//                     <button onClick={() => handleClick(task.id)}>Delete</button>
//                 </li>
//             ))}
//         </ul>
//     </div>
// )
// }
