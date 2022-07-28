import { useState } from "react"
import Select from "./Select"

const Table = ({ className, columns, rows, format }) => {
  const [page, setPage] = useState(0)
  const [resultsPerPage, setResultsPerPage] = useState(25)
  const [pageStart, setPageStart] = useState(0)
  // const pageStart = page * resultsPerPage
  const pageEnd = (pageStart + resultsPerPage) <= rows.length
    ? pageStart + resultsPerPage
    : rows.length


  const nextPage = () => {
    setPage(page + 1);
    setPageStart(page * resultsPerPage)
    window.scrollTo(0, 0)
  };

  const previousPage = () => {
    setPage(page - 1);
    setPageStart(page * resultsPerPage)

    window.scrollTo(0, 0)
  };

  const dataRows = rows.slice(pageStart, pageEnd).map(row => {
    const cells = columns.map(col => {
      const cellData = row[col.property]
      return <td key={`${col.property}: ${cellData}`}>{format(col.property, cellData)}</td>
    })
    return <tr key={Object.values(row).join(':')}>{cells}</tr>
  })

  const headerRow = <tr>{columns.map(col => <th key={col.name}>{col.name}</th>)}</tr>

  const perPageOptions = [
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 75, text: '75' },
    { value: 100, text: '100' }
  ]

  const perPageOnChange = (event) => {
    setPageStart(pageStart)
    setResultsPerPage(Number(event.target.value))
  }

  return (
    <div>
      <Select
        label={'Results to show per page'}
        name={'select-per-page'}
        options={perPageOptions}
        handleOnChange={perPageOnChange}
        optionsState={resultsPerPage}
      />
      <p>Showing {pageStart}-{pageEnd} routes of {rows.length} total routes</p>
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