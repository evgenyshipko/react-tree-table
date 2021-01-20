import React from 'react'
import Row from './Row'
import HeaderCell from './HeaderCell'
import { ICellData } from '../types/Types'

class HeaderRow extends Row {
    getCell(props: ICellData, key: number) {
        return <HeaderCell {...props} key={key}/>
    }
}

export default HeaderRow
