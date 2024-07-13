import { ListOfUsers } from '../types';

interface UsersTableProps {
  users: ListOfUsers[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Picture</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <img src={user.picture} />
            </td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.country}</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
