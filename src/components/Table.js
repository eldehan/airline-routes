import { useState } from "react"

const Table = ({ className, columns, rows, format }) => {
  const [page, setPage] = useState(0)
  const resultsPerPage = 25
  const pageStart = page * resultsPerPage
  const pageEnd = pageStart + resultsPerPage

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  const dataRows = rows.slice(pageStart, pageEnd).map(row => {
    const cells = columns.map(col => {
      const cellData = row[col.property]
      return <td key={`${col.property}: ${cellData}`}>{format(col.property, cellData)}</td>
    })
    return <tr key={Object.values(row).join(':')}>{cells}</tr>
  })

  const headerRow = <tr>{columns.map(col => <th key={col.name}>{col.name}</th>)}</tr>

  return (
    <div>
      <table className={className}>
        <thead>
          {headerRow}
        </thead>
        <tbody>
          {dataRows}
        </tbody>
      </table>
      <button onClick={previousPage} disabled={page === 0}>Previous Page</button>
      <button onClick={nextPage} disabled={pageEnd >= rows.length}>Next Page</button>
    </div>
  )
}

export default Table