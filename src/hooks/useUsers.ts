import { useEffect, useRef, useState } from 'react';
import { type ListOfUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';

export function useUsers() {
  const [listOfUsers, setListOfUsers] = useState<ListOfUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOccurrence, setErrorOccurrence] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Here im using useRef in order to save the original list of users
  // Im using useRef because i want to save this value so it can be shared between each render.
  // So when the list of users change and i reset it i dont want to re render the component.
  const originalUsers = useRef<ListOfUsers[]>([]);
  const isInitialMount = useRef<boolean>(true);
  const UsersReset = useRef<boolean>(false);

  useEffect(() => {
    async function InitialDataFetch() {
      try {
        setIsLoading(true);
        setErrorOccurrence(false);

        const data = await fetchUsers(currentPage);

        setListOfUsers(data);
        originalUsers.current = data;
        isInitialMount.current = false;
      } catch (error) {
        console.log(error);
        setErrorOccurrence(true);
      } finally {
        setIsLoading(false);
      }
    }

    InitialDataFetch();
  }, []);

  useEffect(() => {
    async function UpdateDataFetch() {
      try {
        setIsLoading(true);
        setErrorOccurrence(false);

        const data = await fetchUsers(currentPage);

        setListOfUsers((prevUsers) => [...prevUsers, ...data]);
      } catch (error) {
        console.log(error);
        setErrorOccurrence(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isInitialMount.current && !UsersReset.current) {
      UpdateDataFetch();
    } else {
      UsersReset.current = false;
    }
  }, [currentPage]);

  function updateListOfUsers(users: ListOfUsers[]) {
    return setListOfUsers(users);
  }

  function deleteUser(id: string) {
    const newListOfUsers = listOfUsers.filter((user) => user.id !== id);
    setListOfUsers(newListOfUsers);
  }

  async function resetUsers() {
    setListOfUsers(originalUsers.current);
    UsersReset.current = true;
    setCurrentPage(1);
  }

  function loadMoreUsers() {
    setCurrentPage((prevState) => prevState + 1);
  }

  return {
    listOfUsers,
    isLoading,
    errorOccurrence,
    updateListOfUsers,
    deleteUser,
    resetUsers,
    loadMoreUsers,
  };
}
