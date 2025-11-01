import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'

import makeData from './makeData'

const Styles = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #0f172a;
  padding: 2.5rem 1.5rem;
  background: linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #fde047 100%);
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.3), transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(253, 224, 71, 0.3), transparent 50%);
    pointer-events: none;
  }

  .card {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.12),
      0 8px 16px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 24px 70px rgba(0, 0, 0, 0.15),
        0 10px 20px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  p.lead {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .toolbar {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 0.625rem 1rem;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    &:focus-within {
      border-color: #f59e0b;
      background: #ffffff;
      box-shadow: 
        0 0 0 3px rgba(245, 158, 11, 0.1),
        0 2px 8px rgba(245, 158, 11, 0.15);
      transform: translateY(-1px);
    }

    svg {
      transition: all 0.2s ease;
    }

    &:focus-within svg {
      stroke: #f59e0b;
    }
  }

  .search input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.95rem;
    width: 240px;
    color: #0f172a;
    font-weight: 500;

    &::placeholder {
      color: #94a3b8;
    }
  }

  .controls {
    display: flex;
    gap: 0.625rem;
    align-items: center;
  }

  button.btn {
    background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
    color: white;
    padding: 0.625rem 1.25rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 
      0 4px 14px rgba(234, 88, 12, 0.4),
      0 2px 6px rgba(234, 88, 12, 0.2);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 6px 20px rgba(234, 88, 12, 0.5),
        0 4px 10px rgba(234, 88, 12, 0.3);

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 
        0 2px 8px rgba(234, 88, 12, 0.4),
        0 1px 4px rgba(234, 88, 12, 0.2);
    }
  }

  button.ghost {
    background: white;
    color: #475569;
    border: 2px solid #e2e8f0;
    padding: 0.625rem 1rem;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

    &:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      color: #1e293b;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }
  }

  .table-wrap {
    overflow: auto;
    margin-top: 1.5rem;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    background: white;
  }

  .table {
    min-width: 700px;
    border-spacing: 0;
    width: 100%;
  }

  .tr {
    display: flex;
    transition: background-color 0.15s ease;

    &:hover .td {
      background: linear-gradient(90deg, rgba(234, 88, 12, 0.03) 0%, rgba(245, 158, 11, 0.02) 100%);
    }
  }

  .th {
    display: flex;
    align-items: center;
    padding: 1rem 1.25rem;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #475569;
    border-bottom: 2px solid #e2e8f0;
    position: relative;
    background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
    user-select: none;
  }

  .td {
    display: flex;
    align-items: center;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background-color 0.15s ease;
  }

  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: transparent;
    cursor: col-resize;
    touch-action: none;
    user-select: none;
    transition: all 0.2s ease;
    z-index: 10;

    &::after {
      content: '';
      position: absolute;
      right: 50%;
      top: 50%;
      transform: translate(50%, -50%);
      width: 3px;
      height: 60%;
      background: #cbd5e1;
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover {
      &::after {
        opacity: 1;
        background: #94a3b8;
      }
    }
  }

  .resizer.isResizing {
    &::after {
      opacity: 1;
      background: linear-gradient(180deg, #ea580c 0%, #f59e0b 100%);
      width: 4px;
      height: 80%;
      box-shadow: 0 0 8px rgba(234, 88, 12, 0.6);
    }
  }

  .empty {
    padding: 3rem 1rem;
    color: #94a3b8;
    text-align: center;
    font-style: italic;
    font-size: 0.95rem;
  }

  pre {
    margin-top: 1.5rem;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    color: #e2e8f0;
    padding: 1.25rem;
    border-radius: 16px;
    font-size: 0.8rem;
    overflow: auto;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);

    code {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;

    .card {
      padding: 1.5rem;
      border-radius: 20px;
    }

    h1 {
      font-size: 1.5rem;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
    }

    .toolbar {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }

    .search {
      width: 100%;
    }

    .search input {
      width: 100%;
    }

    .controls {
      width: 100%;
      justify-content: stretch;

      button {
        flex: 1;
      }
    }
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
