import React, { Component, CSSProperties } from 'react'
import Row, { RowProps } from './Row'
import HeaderRow from './HeaderRow'

export interface TableProps {
    className?: string
    style?: CSSProperties
    rowList: RowProps[]
    header: RowProps
}

class Table extends Component<TableProps> {
    render() {
        const { rowList, header, className, style } = this.props

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
