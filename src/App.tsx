import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [listOfUsers, setListOfUsers] = useState();

  useEffect(() => {
    const apiLink =
      'https://randomuser.me/api/?results=10&inc=picture,name,location';

    fetch(apiLink)
      .then((response) => response.json())
      .then((data) => setListOfUsers(data.results))
      .catch((err) => console.log(`Error when connecting to DB ${err}`));
  }, []);

  console.log(listOfUsers);
  return (
    <>
      <h1>HI</h1>
    </>
  );
}

export default App;
