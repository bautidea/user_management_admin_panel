import { ListOfUsers, SortBy } from '../types.d';

interface UsersTableProps {
  users: ListOfUsers[];
  colorRows: boolean;
  handleDelete: (id: string) => void;
  changeSorting: (sort: SortBy) => void;
}

export default function UsersTable({
  users,
  colorRows,
  handleDelete,
  changeSorting,
}: UsersTableProps) {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Picture</th>
          <th
            onClick={() => changeSorting(SortBy.FNAME)}
            style={{ cursor: 'pointer' }}
          >
            First Name
          </th>
          <th
            onClick={() => changeSorting(SortBy.LNAME)}
            style={{ cursor: 'pointer' }}
          >
            Last Name
          </th>
          <th
            onClick={() => changeSorting(SortBy.COUNTRY)}
            style={{ cursor: 'pointer' }}
          >
            Country
          </th>
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
