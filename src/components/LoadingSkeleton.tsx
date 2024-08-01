import './LoadingSkeleton.css';

export function LoadingSkeleton() {
  const skeletonsRows = Array.from({ length: 5 });
  return (
    <tbody>
      {skeletonsRows.map((_, index) => (
        <tr key={index} className="skeletonRow">
          <td className="skeletonTd">
            <div className="skeleton img displayInlineBlock" />
          </td>
          <td className="skeletonTd">
            <div className="skeleton txt displayInlineBlock" />
          </td>
          <td className="skeletonTd">
            <div className="skeleton txt displayInlineBlock" />
          </td>
          <td className="skeletonTd">
            <div className="skeleton txt displayInlineBlock" />
          </td>
          <td className="skeletonTd">
            <div className="skeleton txt displayInlineBlock" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
