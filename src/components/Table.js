const Table = ({ className, columns, rows, format }) => {
  const dataRows = rows.slice().map(row => {
    const cells = columns.map(col => {
      const cellData = row[col.property]
      return <td key={`${col.property}: ${cellData}`}>{format(col.property, cellData)}</td>
    })
    return <tr key={Object.values(row).join(':')}>{cells}</tr>
  })

  const headerRow = <tr>{columns.map(col => <th key={col.name}>{col.name}</th>)}</tr>

  return (
    <table className={className}>
      <thead>
        {headerRow}
      </thead>
      <tbody>
        {dataRows}
      </tbody>
    </table>
  )
}

export default Table