import { useState } from 'react';
import { ListOfUsers } from '../types';

export function useUsers() {
  const [listOfUsers, setListOfUsers] = useState<ListOfUsers[]>([]);

  function updateListOfUsers(users: ListOfUsers[]) {
    return setListOfUsers(users);
  }

  return { listOfUsers, updateListOfUsers };
}
