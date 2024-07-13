import { Result } from '../types';

export async function fetchUsers() {
  const apiLink =
    'https://randomuser.me/api/?results=100&inc=picture,name,location';

  return fetch(apiLink)
    .then((response) => response.json())
    .then((data) => {
      return data.results.map(({ picture, name, location }: Result) => {
        return {
          picture: picture.thumbnail,
          firstName: name.first,
          lastName: name.last,
          country: location.country,
        };
      });
    })
    .catch((err) => console.error(`Error when connecting to DB ${err}`));
}
