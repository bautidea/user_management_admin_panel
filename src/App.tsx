import { useMemo, useState } from 'react';
import './App.css';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';

function App() {
  const { listOfUsers, deleteUser, resetUsers } = useUsers();
  const [colorRows, setColorRows] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filterCountry, setFilterCountry] = useState('');

  function toggleRowColors() {
    setColorRows(!colorRows);
  }

  function toggleSortByCountry() {
    setSortByCountry(!sortByCountry);
  }

  function handleChangeCountryFilter(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterCountry(event.target.value);
  }

  // Im going to use useMemo so each time i do an action that is not filter by country the users dont get sorted,
  // in other words i dont want to sort the users when it is not needed.
  const filteredUsers = useMemo(() => {
    return filterCountry !== '' && filterCountry.length > 0
      ? listOfUsers.filter((user) =>
          user.country.toLowerCase().includes(filterCountry.toLowerCase())
        )
      : listOfUsers;
  }, [listOfUsers, filterCountry]);

  // Here im memoizing the value of 'sortedUsers' between renders, so if the dependencies in
  // the array change, then the value of 'sortedUsers' gets re calculated.
  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? filteredUsers.toSorted((a, b) => a.country.localeCompare(b.country))
      : filteredUsers;
  }, [filteredUsers, sortByCountry]);

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
        <input
          placeholder="Filter by country"
          type="text"
          value={filterCountry}
          onChange={handleChangeCountryFilter}
        ></input>
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
