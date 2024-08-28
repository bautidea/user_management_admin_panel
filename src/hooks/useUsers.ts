import { type ListOfUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useUsers() {
  const { isLoading, isError, data, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery<ListOfUsers>({
      queryKey: ['users'],
      queryFn: fetchUsers as any,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

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
