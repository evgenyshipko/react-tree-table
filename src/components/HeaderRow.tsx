import React from 'react'
import Row from './Row'
import HeaderCell from './HeaderCell'
import { CellProps } from '../types/PropTypes'

class HeaderRow extends Row {
    getCell(props: CellProps, key: number) {
        return <HeaderCell {...props} key={key}/>
    }
}

export default HeaderRow
