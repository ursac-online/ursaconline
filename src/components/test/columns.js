import { format } from 'date-fns'
import  SearchColumn  from './SearchColumn'

export const COLUMNS = [
    {
        Header: 'ID',
        Footer: 'ID',
        accessor: 'id',
        disableFilters: true
    },
    {
        Header: 'Student ID',
        Footer: 'Student ID',
        accessor: 'studentID'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Password',
        Footer: 'Password',
        accessor: 'password'
    },
    {
        Header: 'Date Created',
        Footer: 'Date Created',
        accessor: 'dateCreated',
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy')}
    }
]