import { useDispatch, useSelector } from 'react-redux'
import { nextPage, previousPage, setResultsPerPage } from '../reducers/paginationReducer'
import Select from "./Select"

const Table = ({ className, columns, rows, format }) => {
  const dispatch = useDispatch()
  const { page, pageStart, resultsPerPage } = useSelector(state => state.pages)
  const pageEnd = (pageStart + resultsPerPage) <= rows.length
    ? pageStart + resultsPerPage
    : rows.length

  const gotoNextPage = () => {
    dispatch(nextPage())
    window.scrollTo(0, 0)
  };

  const gotoPreviousPage = () => {
    dispatch(previousPage())
    window.scrollTo(0, 0)
  };

  const perPageOnChange = (event) => {
    dispatch(setResultsPerPage(Number(event.target.value)))
  }

  const perPageOptions = [
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 75, text: '75' },
    { value: 100, text: '100' }
  ]

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
      <Select
        label={'Results to show per page'}
        name={'select-per-page'}
        options={perPageOptions}
        handleOnChange={perPageOnChange}
        optionsState={resultsPerPage}
        enabledKey={undefined}
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
      <button onClick={gotoPreviousPage} disabled={page === 0}>Previous Page</button>
      <button onClick={gotoNextPage} disabled={pageEnd >= rows.length}>Next Page</button>
    </div>
  )
}

export default Table