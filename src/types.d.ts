declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}

export interface Result {
  name: Name;
  location: Location;
  picture: Picture;
  email: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: { latitude: string; longitude: string };
  timezone: { offset: string; description: string };
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
interface ResultUsers {
  id: string;
  picture: string;
  firstName: string;
  lastName: string;
  country: string;
}
export interface ListOfUsers {
  resultUsers: ResultUsers[];
  nextCursor: number;
}

export enum SortBy {
  NONE = 'none',
  FNAME = 'firstName',
  LNAME = 'lastName',
  COUNTRY = 'country',
}
