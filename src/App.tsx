import { useState } from 'react';
import './App.css';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';

function App() {
  const { listOfUsers, deleteUser, resetUsers } = useUsers();
  const [colorRows, setColorRows] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  function toggleRowColors() {
    setColorRows(!colorRows);
  }

  function toggleSortByCountry() {
    setSortByCountry(!sortByCountry);
  }

  const sortedUsers = sortByCountry
    ? listOfUsers.toSorted((a, b) => a.country.localeCompare(b.country))
    : listOfUsers;

  return (
    <>
      <h1>Users List</h1>
      <header
        style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '2.5rem',
          justifyContent: 'center',
        }}
      >
        <button onClick={toggleRowColors}>Color rows</button>
        <button onClick={toggleSortByCountry}>Sort by country</button>
        <button onClick={resetUsers}>Reset list of users</button>
      </header>
      <main>
        <UsersTable
          users={sortedUsers}
          colorRows={colorRows}
          handleDelete={deleteUser}
        />
      </main>
    </>
  );
}

export default App;
