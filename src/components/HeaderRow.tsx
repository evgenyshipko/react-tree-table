import React from 'react'
import Row from './Row'
import HeaderCell from './HeaderCell'
import { CellData } from '../types/Types'

class HeaderRow extends Row {
    getCell(props: CellData) {
        return <HeaderCell {...props} />
    }
}

export default HeaderRow
