declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}

export interface Result {
  name: Name;
  location: Location;
  picture: Picture;
  id: Id;
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

interface Id {
  name: string;
  value: string | null;
}
export interface ListOfUsers {
  id: string | null;
  picture: string;
  firstName: string;
  lastName: string;
  country: string;
}
