import './LoadingSkeleton.css';
import './UsersTable.css';

export function LoadingSkeleton() {
  const skeletonsRows = Array.from({ length: 5 });
  return (
    <table>
      <tbody>
        {skeletonsRows.map((_, index) => (
          <tr key={index} className="skeletonRow">
            <td className="pictureCol skeletonTd">
              <div className="skeleton img displayInlineBlock" />
            </td>
            <td className="fNameCol skeletonTd">
              <div className="skeleton txt displayInlineBlock" />
            </td>
            <td className="lNameCol skeletonTd">
              <div className="skeleton txt displayInlineBlock" />
            </td>
            <td className="countryCol skeletonTd">
              <div className="skeleton txt displayInlineBlock" />
            </td>
            <td className="actionCol skeletonTd">
              <div className="skeleton txt displayInlineBlock" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
