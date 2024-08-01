import { useEffect, useRef, useState } from 'react';
import { type ListOfUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';

export function useUsers() {
  const [listOfUsers, setListOfUsers] = useState<ListOfUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorOccurrence, setErrorOccurrence] = useState<boolean>(false);

  // Here im using useRef in order to save the original list of users
  // Im using useRef because i want to save this value so it can be shared between each render.
  // So when the list of users change and i reset it i dont want to re render the component.
  const originalUsers = useRef<ListOfUsers[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const data = await fetchUsers();
        setListOfUsers(data);
        originalUsers.current = data;
      } catch (error) {
        console.log(error);
        setErrorOccurrence(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function updateListOfUsers(users: ListOfUsers[]) {
    return setListOfUsers(users);
  }

  function deleteUser(id: string) {
    const newListOfUsers = listOfUsers.filter((user) => user.id !== id);
    setListOfUsers(newListOfUsers);
  }

  async function resetUsers() {
    setListOfUsers(originalUsers.current);
  }

  return {
    listOfUsers,
    isLoading,
    errorOccurrence,
    updateListOfUsers,
    deleteUser,
    resetUsers,
  };
}
