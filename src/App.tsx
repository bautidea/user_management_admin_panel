import { useMemo, useState } from 'react';
import './App.css';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';
import { SortBy } from './types.d';
import { NoDataFound } from './components/NoDataFound';
import { LoadingSkeleton } from './components/LoadingSkeleton';

function App() {
  const {
    listOfUsers,
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    deleteUser,
    resetUsers,
    loadMoreUsers,
  } = useUsers();
  const [colorRows, setColorRows] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState('');

  function toggleRowColors() {
    setColorRows(!colorRows);
  }

  function toggleSortByCountry() {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  }

  function handleChangeCountryFilter(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterCountry(event.target.value);
  }

  function handleSortChange(sort: SortBy) {
    setSorting(sort);
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
    if (sorting === SortBy.FNAME)
      return filteredUsers.toSorted((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );

    if (sorting === SortBy.LNAME)
      return filteredUsers.toSorted((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );

    if (sorting === SortBy.COUNTRY)
      return filteredUsers.toSorted((a, b) =>
        a.country.localeCompare(b.country)
      );

    return filteredUsers;
  }, [filteredUsers, sorting]);

  if (!isLoading && isError) {
    return (
      <>
        <h1>Users List</h1>
        <NoDataFound />
      </>
    );
  }

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
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'Stop sort by country'
            : 'Sort by country'}
        </button>
        <button onClick={resetUsers}>Reset list of users</button>
        <input
          placeholder="Filter by country"
          type="text"
          value={filterCountry}
          onChange={handleChangeCountryFilter}
        ></input>
      </header>

      <main>
        {sortedUsers.length > 0 && (
          <UsersTable
            users={sortedUsers}
            colorRows={colorRows}
            handleDelete={deleteUser}
            changeSorting={handleSortChange}
          />
        )}

        {(isLoading || isFetching) && <LoadingSkeleton />}

        {hasNextPage && !isLoading && !isFetching && !isError && (
          <button style={{ marginTop: '25px' }} onClick={loadMoreUsers}>
            Load More
          </button>
        )}
      </main>
    </>
  );
}

export default App;
