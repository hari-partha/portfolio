type ReaderDataTableProps = {
  caption?: string;
  headers?: string[];
  rows: string[][];
};

export function ReaderDataTable({ caption, headers, rows }: ReaderDataTableProps) {
  const columnCount = headers?.length ?? rows[0]?.length ?? 0;

  return (
    <figure className="reader-table-wrap">
      <div className="reader-table-scroll">
        <table className="reader-table">
          {headers && headers.length > 0 && (
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
                {row.length < columnCount &&
                  Array.from({ length: columnCount - row.length }).map((_, padIndex) => (
                    <td key={`pad-${rowIndex}-${padIndex}`} />
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="reader-table-caption">{caption}</figcaption>}
    </figure>
  );
}
