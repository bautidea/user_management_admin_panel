export interface Result {
  name: Name;
  location: Location;
  picture: Picture;
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

export interface ListOfUsers {
  picture: string;
  firstName: string;
  lastName: string;
  country: string;
}
