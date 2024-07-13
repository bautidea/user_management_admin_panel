import { useEffect, useState } from 'react';
import './App.css';
import { fetchUsers } from './services/fetchUsers';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers();
      setListOfUsers(data);
    }

    fetchData();
  }, []);
  console.log(listOfUsers);

  return (
    <>
      <h1>HI</h1>
    </>
  );
}

export default App;
