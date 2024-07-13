import { Result } from '../types';

export async function fetchUsers() {
  const apiLink =
    'https://randomuser.me/api/?results=100&inc=id,picture,name,location';

  return fetch(apiLink)
    .then((response) => response.json())
    .then((data) => {
      return data.results.map(({ id, picture, name, location }: Result) => {
        return {
          id: id.value,
          picture: picture.thumbnail,
          firstName: name.first,
          lastName: name.last,
          country: location.country,
        };
      });
    })
    .catch((err) => console.error(`Error when connecting to DB ${err}`));
}
