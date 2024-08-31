import { Result } from '../types';

export async function fetchUsers({ pageParam }: { pageParam?: number }) {
  const seed = 'horse'; // Random seed.
  // Since the id field in the api call can be null im going to use
  // the email. Email is a unique field, so i can identify users with this
  // field.
  const apiLink = `https://randomuser.me/api/?results=10&inc=email,picture,name,location&seed=${seed}&page=${pageParam}`;

  const response = await fetch(apiLink);

  if (!response.ok) throw new Error('Error when connecting to DB');

  const data = await response.json();

  const resultUsers = data.results.map(
    ({ email, picture, name, location }: Result) => {
      return {
        id: email,
        picture: picture.thumbnail,
        firstName: name.first,
        lastName: name.last,
        country: location.country,
      };
    }
  );

  const currentPage = Number(data.info.page);

  // Limiting the amount of pages to show.
  const nextCursor = currentPage > 5 ? undefined : currentPage + 1;

  return { resultUsers, nextCursor };
}
