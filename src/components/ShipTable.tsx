import React, { Component, CSSProperties } from 'react'
import { ColumnData, RowData } from '../types/Types'
import Table, { TableProps } from './Table'
import { RowProps } from './Row'

export interface ShipTableProps {
    columns: ColumnData[],
    rows: RowData[],
    className?: string,
    style?: CSSProperties
}

interface State {
    columnOrder: string[]
}

class ShipTable extends Component<ShipTableProps> {
    state: State = {
        columnOrder: this.getColumnOrder()
    }

    getColumnOrder() {
        return this.props.columns.map(columnData => columnData.id)
    }

    getTableProps(): TableProps {
        const { columns, rows, className, style } = this.props

        const header: RowProps = {
            cellDataList: columns.map(columnData => (
                {
                    data: columnData.title,
                    className: columnData.className,
                    style: columnData.style
                }
            ))
        }

        const rowList: RowProps[] = rows.map(rowData => (
            {
                cellDataList: this.state.columnOrder.map(columnName => rowData.data[columnName]),
                style: rowData.style,
                className: rowData.className
            }
        ))

        return { header, rowList, className, style }
    }

    render() {
        return <Table {...this.getTableProps()} />
    }
}

export default ShipTable
