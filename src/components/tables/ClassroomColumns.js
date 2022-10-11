import { format } from 'date-fns'

export const ClassroomColumns = [
    {
        Header: 'ID',
        accessor: 'id',
        disableFilters: true
    },
    {
        Header: 'Subject Course',
        accessor: 'subjectName'
    },
    {
        Header: 'Instructor',
        accessor: 'instructor'
    },
    {
        Header: 'Year & Section',
        accessor: 'yearSection'
    },
    {
        Header: 'Date Created',
        accessor: 'dateCreated',
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy h/m a')}
    }
]