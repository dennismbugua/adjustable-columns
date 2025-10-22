import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'

import makeData from './makeData'

const Styles = styled.div`
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  color: #0f172a; /* slate-900 */
  padding: 2rem;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  min-height: 100vh;

  .card {
    max-width: 1100px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(2,6,23,0.08);
    padding: 1.25rem;
    border: 1px solid rgba(15, 23, 42, 0.04);
  }

  .header {
    display:flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .title {
    display:flex;
    flex-direction: column;
  }

  h1 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #07122b;
  }

  p.lead {
    margin: 0;
    color: #475569; /* slate-500 */
    font-size: 0.9rem;
  }

  .toolbar {
    display:flex;
    gap: 0.75rem;
    align-items: center;
  }

  .search {
    display:flex;
    align-items:center;
    gap: 0.5rem;
    background: #f1f5f9; /* slate-100 */
    padding: 0.375rem 0.5rem;
    border-radius: 8px;
    border: 1px solid transparent;
  }

  .search input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.95rem;
    width: 220px;
  }

  .controls {
    display:flex;
    gap: 0.5rem;
    align-items:center;
  }

  button.btn {
    background: linear-gradient(180deg,#0ea5a4 0%, #0284c7 100%);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 6px 18px rgba(2,6,23,0.08);
  }

  button.ghost {
    background: transparent;
    color: #0f172a;
    border: 1px solid rgba(15,23,42,0.06);
    padding: 0.45rem 0.65rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }

  .table-wrap {
    overflow: auto;
    margin-top: 1rem;
    border-radius: 8px;
    border: 1px solid rgba(2,6,23,0.04);
  }

  .table {
    min-width: 700px;
    border-spacing: 0;
    width: 100%;
  }

  .tr {
    display: flex;
  }

  .th {
    display: flex;
    align-items: center;
    padding: 0.75rem 0.85rem;
    font-weight: 700;
    font-size: 0.85rem;
    color: #0f172a;
    border-bottom: 1px solid rgba(2,6,23,0.06);
    position: relative;
    background: linear-gradient(180deg,rgba(255,255,255,0.6), rgba(250,250,250,0.6));
  }

  .td {
    padding: 0.65rem 0.85rem;
    border-bottom: 1px solid rgba(2,6,23,0.04);
    color: #334155; /* slate-700 */
    font-size: 0.95rem;
  }

  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 10px;
    transform: translateX(50%);
    background: linear-gradient(90deg, rgba(15,23,42,0.06), rgba(15,23,42,0.12));
    cursor: col-resize;
    touch-action: none;
  }

  .resizer.isResizing {
    background: linear-gradient(90deg, #06b6d4, #0369a1);
  }

  .empty {
    padding: 1rem;
    color: #64748b;
  }

  pre {
    margin-top: 1rem;
    background: #0b1220;
    color: #e6eef8;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.75rem;
    overflow: auto;
  }
`

function Table({ columns, data, resetSignalRef }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 40,
      width: 150,
      maxWidth: 600,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  )

  // Expose reset function to parent via ref-like object
  React.useEffect(() => {
    if (resetSignalRef) resetSignalRef.current = resetResizing
  }, [resetSignalRef, resetResizing])

  return (
    <>
      <div className="table-wrap">
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr" key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th" key={column.id}>
                    {column.render('Header')}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.length === 0 && (
              <div className="tr empty">No rows match your search.</div>
            )}

            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <div {...row.getRowProps()} className="tr" key={row.id}>
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className="td" key={cell.column.id}>
                        {cell.render('Cell')}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            width: 50,
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            width: 60,
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const originalData = React.useMemo(() => makeData(25), [])
  const [filter, setFilter] = React.useState('')
  const resetRef = React.useRef(null)

  const filteredData = React.useMemo(() => {
    if (!filter) return originalData
    const q = filter.trim().toLowerCase()
    return originalData.filter(row => {
      return (
        String(row.firstName).toLowerCase().includes(q) ||
        String(row.lastName).toLowerCase().includes(q) ||
        String(row.status).toLowerCase().includes(q)
      )
    })
  }, [filter, originalData])

  return (
    <Styles>
      <div className="card">
        <div className="header">
          <div className="title">
            <h1>Adjustable Columns</h1>
            <p className="lead">Drag the column edges to resize. Use search to filter rows.</p>
          </div>

          <div className="toolbar" role="toolbar" aria-label="Table controls">
            <div className="search" aria-hidden={false}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 21l-4.35-4.35" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" stroke="#0f172a" strokeWidth="1.5" />
              </svg>
              <input
                aria-label="Search rows"
                placeholder="Search first name, last name, status..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
            </div>

            <div className="controls">
              <button
                className="ghost"
                onClick={() => setFilter('')}
                title="Clear search"
                aria-label="Clear search"
              >
                Clear
              </button>
              <button
                className="btn"
                onClick={() => resetRef.current && resetRef.current()}
                title="Reset column sizes"
                aria-label="Reset column sizes"
              >
                Reset Resizing
              </button>
            </div>
          </div>
        </div>

        <Table columns={columns} data={filteredData} resetSignalRef={resetRef} />
      </div>
    </Styles>
  )
}

export default App
