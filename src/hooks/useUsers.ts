import { ListOfUsers, type ResultUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useUsers() {
  const { isLoading, isError, data, fetchNextPage, refetch } =
    useInfiniteQuery<ResultUsers>({
      queryKey: ['users'],
      queryFn: fetchUsers as any,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  // Im using flatMap method because TanStack returns each new page as an independent array
  //* {
  //*   pages: [
  //*     {resultUsers: Array(10), nextCursor: 2}
  //*     {resultUsers: Array(10), nextCursor: 3}
  //*     {resultUsers: Array(10), nextCursor: 4}
  //*   ]
  //* }
  // With 'flatMap' we got a single array with all resultUsers.
  const listOfUsers: ListOfUsers[] =
    data?.pages?.flatMap((result) => result.resultUsers) ?? [];

  console.log(listOfUsers);

  function deleteUser(id: string) {
    return id;
    // const newListOfUsers = listOfUsers.filter((user) => user.id !== id);
    // setListOfUsers(newListOfUsers);
  }

  async function resetUsers() {
    await refetch();
  }

  function loadMoreUsers() {
    fetchNextPage();
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
