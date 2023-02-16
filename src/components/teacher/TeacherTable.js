import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import { DeleteForever, EditRounded, Search } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalFilter, useTable } from 'react-table';
import InstructorUpdate from '../../components/teacher/InstructorUpdate';
import SearchFilter from '../tables/Search';
import { TeacherColumns } from './TeacherColumns';

const useStyle = makeStyles(theme => {
  return {
    mainRoot: {
      '& .MuiTableCell-stickyHeader': {
        backgroundColor: '#333',
        border: '#333',
        color: '#f9f9f9'
      }
    },
    root: {
      '& .MuiTableCell-root': {
        border: '1px solid #dfdfdf'
      },
      '& .MuiTableRow-root': {
        '&:hover': {
          backgroundColor: '#dfdfdf'
        },
        '&:nth-child(even)': {
          backgroundColor: '#f4f4f4',
          '&:hover': {
            backgroundColor: '#dfdfdf'
          }
        }
      }
    },
    container: {
      maxHeight: 448,
    },
    header: {
      padding: theme.spacing(1)
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.25)',
      },
      '& .Mui-focus': {
        backgroundColor: 'rgba(0,0,0,0.25)',
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    divider: {
      backgroundColor: '#222'
    }
  }
})

export default function TeacherTable() {

  const classes = useStyle();


  const [instructor, setInstructor] = useState([]);
  function showInstructors() {
    axios.get('https://ursacapi.000webhostapp.com/api/teachersTable.php')
      .then((response) => {
        setInstructor(response.data);
      })
      .catch(err => console.log(err))
  };
  useEffect(() => {
    showInstructors();
  }, []);


  const columns = useMemo(() => TeacherColumns, [])
  const data = useMemo(() => instructor, [instructor])

  
  const [editModal, setEditModal] = useState(false);
  const [updateID, setUpdateID] = useState(0);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Edit',
        Cell: ({ row }) => (
          <Button variant='contained' color='secondary' disableElevation onClick={() => {
            setEditModal(true);
            setUpdateID(row.values.id)
          }} >
            <EditRounded />
          </Button>
        ),
      },
      {
        id: 'Delete',
        Header: 'Delete',
        Cell: ({ row }) => (
          <Button variant='contained' color='secondary' disableElevation onClick={() => {
            setUpdateID(row.values.id)
            setOpenDelete(true)
            showInstructors()
          }} >
            <DeleteForever />
          </Button>
        ),
      },
    ])
  }

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
  },
    tableHooks,
    useGlobalFilter
  )

  const handleClose = () => {
    setEditModal(false)
    showInstructors();
  }
  const deleteUser = (removeId) => {
    axios.post('https://ursacapi.000webhostapp.com/api/removeInstructor.php', removeId)
              .then(response => {
                console.log(response.data);
                showInstructors();
              })
      handleCloseDelete()
  }

  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const { globalFilter } = state

  return (
    <>
      <Box className={classes.mainRoot}>
        <div>
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogContent>
                Are you sure you want to remove this data?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => deleteUser(updateID)}>Confirm</Button>
              <Button variant='contained' color='secondary' onClick={handleCloseDelete}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={editModal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <DialogTitle>
              Edit Instructor Data
            </DialogTitle>
            <DialogContent>
              <InstructorUpdate updateID={updateID} />
            </DialogContent>
          </Dialog>
        </div>
        <Container className={classes.root}>
          <Paper variant='outlined'>
            <div className={classes.header}>
              <Toolbar>
                <Typography variant='h4'>
                  Instructor List
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <Search />
                  </div>
                  <SearchFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
              </Toolbar>
            </div>
            <TableContainer className={classes.container}>
              <Table {...getTableProps} size="small" stickyHeader>
                <TableHead>
                  {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <TableCell {...column.getHeaderProps()}>
                          {column.render('Header')}
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
                            <TableCell {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </TableCell>
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
      </Box>
    </>
  );
}

