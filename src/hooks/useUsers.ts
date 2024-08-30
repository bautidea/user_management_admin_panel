import { type ResultUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';
import { QueryFunction, useInfiniteQuery } from '@tanstack/react-query';

export function useUsers() {
  const { isLoading, isError, data, isFetching, refetch } =
    useInfiniteQuery<ResultUsers>({
      queryKey: ['users'],
      queryFn: fetchUsers,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor + 1,
    });
  console.log(isFetching);
  console.log(data);

  function deleteUser(id: string) {
    return id;
    // const newListOfUsers = listOfUsers.filter((user) => user.id !== id);
    // setListOfUsers(newListOfUsers);
  }

  async function resetUsers() {
    await refetch();
  }

  function loadMoreUsers() {
    // setCurrentPage((prevState) => prevState + 1);
  }

  return {
    listOfUsers,
    isLoading,
    isError,
    deleteUser,
    resetUsers,
    loadMoreUsers,
  };
}
