import { useEffect, useState } from 'react';
import './App.css';
import { fetchUsers } from './services/fetchUsers';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';

function App() {
  const { listOfUsers, updateListOfUsers } = useUsers();
  const [colorRows, setColorRows] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers();
      updateListOfUsers(data);
    }

    fetchData();
  }, []);

  const toggleRowColors = () => {
    setColorRows(!colorRows);
  };

  return (
    <>
      <h1>Users List</h1>
      <header>
        <button onClick={toggleRowColors}>Color Rows</button>
      </header>
      <main>
        <UsersTable users={listOfUsers} colorRows={colorRows} />
      </main>
    </>
  );
}

export default App;
