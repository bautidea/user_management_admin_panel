import { ListOfUsers, type ResultUsers } from '../types';
import { fetchUsers } from '../services/fetchUsers';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
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

  // Define the mutation for deleting a user
  const mutation = useMutation({
    mutationFn: (id: string) => {
      // Here i perform the filtering of the user.
      return listOfUsers.filter((user) => user.id !== id);
    },
    // And onSuccess (its always success because we are not making any asynchronous tasks), such as API calls.
    onSuccess: (filteredUsers: ListOfUsers[]) => {
      // Update the query data after a successful mutation
      queryClient.setQueryData(['users'], (oldData: any) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            resultUsers: page.resultUsers.filter((user: ListOfUsers) =>
              filteredUsers.includes(user)
            ),
          })),
        };
      });
    },
  });

  function deleteUser(id: string) {
    return mutation.mutate(id);
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
