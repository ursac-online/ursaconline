import { format } from 'date-fns'

export const StudentColumns = [
    {
        Header: 'ID',
        accessor: 'id',
        disableFilters: true
    },
    {
        Header: 'Student ID',
        accessor: 'studentID'
    },
    {
        Header: 'Last Name',
        accessor: 'lastName'
    },
    {
        Header: 'First Name',
        accessor: 'firstName'
    },
    {
        Header: 'Middle Name',
        accessor: 'middleName'
    },
    {
        Header: 'College',
        accessor: 'college'
    },
    {
        Header: 'Course',
        accessor: 'course'
    },
    {
        Header: 'Password',
        accessor: 'password'
    },
    {
        Header: 'Date Created',
        accessor: 'dateCreated',
        Cell: ({ value }) => {return format(new Date(value), 'M/d/yyyy h:m a')}
    }
]