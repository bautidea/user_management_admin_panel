import { useEffect } from 'react';
import './App.css';
import { fetchUsers } from './services/fetchUsers';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';

function App() {
  const { listOfUsers, updateListOfUsers } = useUsers();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers();
      updateListOfUsers(data);
    }

    fetchData();
  }, []);

  return <UsersTable users={listOfUsers} />;
}

export default App;
