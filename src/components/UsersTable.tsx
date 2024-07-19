import { ListOfUsers } from '../types';

interface UsersTableProps {
  users: ListOfUsers[];
  colorRows: boolean;
  handleDelete: (id: string) => void;
}

export default function UsersTable({
  users,
  colorRows,
  handleDelete,
}: UsersTableProps) {
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
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555';
          const color = colorRows ? backgroundColor : 'transparent';

          return (
            <tr key={user.id} style={{ background: color }}>
              <td>
                <img src={user.picture} />
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.country}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
