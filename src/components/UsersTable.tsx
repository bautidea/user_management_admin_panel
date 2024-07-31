import { ListOfUsers, SortBy } from '../types.d';
import { LoadingSkeleton } from './LoadingSkeleton';
import './UsersTable.css';

interface UsersTableProps {
  users: ListOfUsers[];
  colorRows: boolean;
  isLoading: boolean;
  handleDelete: (id: string) => void;
  changeSorting: (sort: SortBy) => void;
}

export default function UsersTable({
  users,
  colorRows,
  isLoading,
  handleDelete,
  changeSorting,
}: UsersTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th className="pictureCol">Picture</th>
          <th
            onClick={() => changeSorting(SortBy.FNAME)}
            style={{ cursor: 'pointer' }}
            className="fNameCol"
          >
            First Name
          </th>
          <th
            onClick={() => changeSorting(SortBy.LNAME)}
            style={{ cursor: 'pointer' }}
            className="lNameCol"
          >
            Last Name
          </th>
          <th
            onClick={() => changeSorting(SortBy.COUNTRY)}
            style={{ cursor: 'pointer' }}
            className="countryCol"
          >
            Country
          </th>
          <th className="actionCol">Actions</th>
        </tr>
      </thead>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
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
      )}
    </table>
  );
}
