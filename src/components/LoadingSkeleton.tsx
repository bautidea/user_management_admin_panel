import './LoadingSkeleton.css';

export function LoadingSkeleton() {
  const skeletonsRows = Array.from({ length: 3 });
  return (
    <tbody>
      {skeletonsRows.map((_, index) => (
        <tr key={index} className="skeletonRow">
          <td>
            <div className="skeleton" />
          </td>
          <td>
            <div />
          </td>
          <td>
            <div />
          </td>
          <td>
            <div />
          </td>
          <td>
            <div />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
