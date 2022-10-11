import React, { useEffect, useMemo, useState } from "react"
import { useSortBy, useTable, useGlobalFilter, useFilters, useRowSelect } from "react-table"
import MOCK_DATA from "./MOCK_DATA.json"
import { COLUMNS } from "./columns"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from '@material-ui/core'
import axios from 'axios';
import Search from "../tables/Search"
import SearchColumn from "./SearchColumn"
import { makeStyles } from "@material-ui/core"
import { CheckBox } from "../tables/CheckBox"

const useStyle = makeStyles({
    container: {
        maxHeight: '300px'
    }
})

function BasicTable() {
    const classes = useStyle()


    const [students, setStudents] = useState([]);
    function showStudents() {
        axios.get('http://localhost:80/api/getStudents.php')
            .then((response) => {
                setStudents(response.data);
                if (response.data.Status == 'Invalid') {
                    alert('Invalid User');
                } else {
                    // navigate('/teacherDashboard')
                }
            })
    };
    useEffect(() => {
        showStudents();
        console.log('useEffect');
    }, []);

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => students, [students])
    const defaultColumn = useMemo(() => {
        return {
            Filter: SearchColumn
        }
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns,
        data,
        defaultColumn
    },
        useFilters,
        useGlobalFilter,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
              {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                    <CheckBox {...getToggleAllRowsSelectedProps()} />
                  </div>
                ),
                Cell: ({ row }) => (
                  <div>
                    <CheckBox {...row.getToggleRowSelectedProps()} />
                  </div>
                ),
              },
              ...columns,
            ])
          }
    )

    const { globalFilter } = state

    return (
        <>
            <Search filter={globalFilter} setFilter={setGlobalFilter} />
            <Box>
                <Container>
                    <Paper>
                        <TableContainer className={classes.container}>
                            <Table {...getTableProps} stickyHeader>
                                <TableHead>
                                    {headerGroups.map((headerGroup) => (
                                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <TableCell {...column.getHeaderProps()}>
                                                    {column.render('Header')}
                                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHead>
                                <TableBody {...getTableBodyProps}>
                                    {rows.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <TableRow {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                                
                            </Table>
                        </TableContainer>
                        
                    </Paper>
                </Container>
                
                


                {/* <table {...getTableProps}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps}>
            {rows.map((row) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            )
                        })}
                    </tr>
                )
            })}
            
        </tbody>
    </table> */}
            </Box>
        </>
    )
}

export default BasicTable