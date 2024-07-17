import { useEffect, useState } from 'react';
import './App.css';
import { fetchUsers } from './services/fetchUsers';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';

function App() {
  const { listOfUsers, updateListOfUsers } = useUsers();
  const [colorRows, setColorRows] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  function toggleRowColors() {
    setColorRows(!colorRows);
  }

  function toggleSortByCountry() {
    setSortByCountry(!sortByCountry);
  }

  function handleDelete(index: number) {
    const newListOfUsers = listOfUsers.filter(
      (user, userIndex) => userIndex !== index
    );
    updateListOfUsers(newListOfUsers);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers();
      updateListOfUsers(data);
    }

    fetchData();
  }, []);

  const sortedUsers = sortByCountry
    ? listOfUsers.toSorted((a, b) => a.country.localeCompare(b.country))
    : listOfUsers;

  return (
    <>
      <h1>Users List</h1>
      <header>
        <button onClick={toggleRowColors}>Color rows</button>
        <button onClick={toggleSortByCountry}>Sort by country</button>
      </header>
      <main>
        <UsersTable
          users={sortedUsers}
          colorRows={colorRows}
          handleDelete={handleDelete}
        />
      </main>
    </>
  );
}

export default App;
