import React from 'react';
import { useTable, usePagination } from 'react-table';
import "./tables.css";

const sensorColumns = [
    {
        Header: 'Created At',
        accessor: 'time'
    },
    {
        Header: 'Value',
        accessor: 'value'
    }
];

const waterColumn = [
    {
        Header: 'Pump event',
        accessor: 'pumpEvent'
    },
    {
        Header: 'Time',
        accessor: 'pumpTime'
    },
];

const lightColumn = [
    {
        Header: 'Light event',
        accessor: 'lightEvent'
    },
    {
        Header: 'Time',
        accessor: 'lightTime'
    },
]

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 7 },
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="table-header">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-primary pagination-btn">
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-primary pagination-btn">
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-primary pagination-btn">
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-primary pagination-btn">
                    {'>>'}
                </button>{' '}
                <span className="pagination-current">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
            </div>
        </>
    )
}

export default function DataTables({ type, data }) {
    return (
        <Table columns={type === "sensor" ? sensorColumns : type === "minipump" ? waterColumn : lightColumn} data={data} />
    )
}