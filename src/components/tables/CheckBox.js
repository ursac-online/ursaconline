import { Checkbox } from '@material-ui/core'
import React from 'react'

export const CheckBox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
      
      return (
        <>
          <Checkbox ref={resolvedRef} {...rest} />
        </>
      )
    }
  )