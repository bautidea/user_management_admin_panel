import { useEffect, useRef, useState } from 'react';
import { type ListOfUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';

export function useUsers() {
  const [listOfUsers, setListOfUsers] = useState<ListOfUsers[]>([]);
  // Here im using useRef in order to save the original list of users
  // Im using useRef because i want to save this value so it can be shared between each render.
  // So when the list of users change and i reset it i dont want to re render the component.
  const originalUsers = useRef<ListOfUsers[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers();
      setListOfUsers(data);
      originalUsers.current = data;
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

  return { listOfUsers, updateListOfUsers, deleteUser, resetUsers };
}
