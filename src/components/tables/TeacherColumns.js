import { format } from 'date-fns'

export const TeacherColumns = [
    {
        Header: 'ID',
        accessor: 'id',
        disableFilters: true
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
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy h/m a')}
    }
]