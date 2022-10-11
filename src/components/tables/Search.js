import { InputBase, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

const useStyle = makeStyles(theme => {
  return {
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }
})

function Search({ filter, setFilter }) {
  const classes = useStyle()
    const [value, setValue] = useState(filter);
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    })
  return (
        <InputBase 
        placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            inputProps={{ 'aria-label': 'search' }}
            value={value || ''}
            onChange={e => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}
         />
  )
}

export default Search
