import { Result } from '../types';

export async function fetchUsers() {
  // Since the id field in the api call can be null im going to use
  // the email. Email is a unique field, so i can identify users with this
  // field.
  const apiLink =
    'https://randomuser.me/api/?results=10&inc=email,picture,name,location';

  return fetch(apiLink)
    .then((response) => response.json())
    .then((data) => {
      return data.results.map(({ email, picture, name, location }: Result) => {
        return {
          id: email,
          picture: picture.thumbnail,
          firstName: name.first,
          lastName: name.last,
          country: location.country,
        };
      });
    })
    .catch((err) => console.error(`Error when connecting to DB ${err}`));
}
