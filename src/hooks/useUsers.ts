import { ListOfUsers, type ResultUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryClient } from '../main';

export function useUsers() {
  const { isLoading, isFetching, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ResultUsers>({
      queryKey: ['users'],
      queryFn: fetchUsers as any,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    });

  // Im using flatMap method because TanStack returns each new page as an independent array
  //* {
  //*   pages: [
  //*     {resultUsers: [0, 1, 2], nextCursor: 2}
  //*     {resultUsers: [3, 4, 5], nextCursor: 3}
  //*   ]
  //* }
  // With 'flatMap' we got a single array with all resultUsers -> [0, 1, 2, 3, 4, 5]
  const listOfUsers: ListOfUsers[] =
    data?.pages?.flatMap((result) => result.resultUsers) ?? [];

  function deleteUser(id: string) {
    listOfUsers.filter((user) => user.id !== id);
  }

  async function resetUsers() {
    await queryClient.resetQueries({ queryKey: ['users'], exact: true });
  }

  function loadMoreUsers() {
    fetchNextPage();
  }

  return {
    listOfUsers,
    isLoading,
    isFetching,
    isError,
    hasNextPage, // This is a boolean that will be true if 'nextCursor' is a number, if 'nextCursor' is undefined it will return false.
    deleteUser,
    resetUsers,
    loadMoreUsers,
  };
}
