import React, { Component } from 'react'
import Row from './Row'
import HeaderRow from './HeaderRow'
import { TableProps } from '../types/PropTypes'

class Table extends Component<TableProps> {
    render() {
        const { rowList, header, className, style } = this.props
        console.log('=== render Table ===')
        return (
            <table style={style} className={className}>
                <thead>
                    <HeaderRow {...header}/>
                </thead>
                <tbody>
                    {rowList.map((rowData, index) => <Row {...rowData} key={index}/>)}
                </tbody>
            </table>
        )
    }
}

export default Table
