import { useEffect } from 'react';
import './App.css';
import { fetchUsers } from './services/fetchUsers';
import { useUsers } from './hooks/useUsers';

function App() {
  const { listOfUsers, updateListOfUsers } = useUsers();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers();
      updateListOfUsers(data);
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
