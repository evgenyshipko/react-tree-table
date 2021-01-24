import React, { Component } from 'react'
import { ColumnData, TableData } from '../types/DataTypes'
import Table from './Table'
import deepEqual from 'deep-equal'
import { RowProps, TableProps } from '../types/PropTypes'

interface State {
    columns: ColumnData[]
}

class ShipTable extends Component<TableData> {
    state: State = {
        columns: this.props.columns
    }

    static getDerivedStateFromProps(props: TableData, state: State) {
        if (!deepEqual(props.columns, state.columns)) {
            return {
                columns: props.columns
            }
        }
        return {}
    }

    getColumnOrder() {
        return this.state.columns.map(columnData => columnData.id)
    }

    getTableProps(): TableProps {
        const { rows, className, style } = this.props
        const header = {
            rowId: 'header',
            cellDataList: this.props.columns.map(columnData => (
                {
                    columnId: columnData.id,
                    data: columnData.title,
                    className: columnData.className,
                    style: columnData.style
                }
            ))
        }

        const rowList: RowProps[] = rows.map(rowData => {
            return {
                rowId: rowData.id,
                cellDataList: this.getColumnOrder().map(columnId => ({ ...rowData.data[columnId], columnId: columnId })),
                style: rowData.style,
                className: rowData.className
            }
        })

        return { header, rowList, className, style }
    }

    render() {
        return <Table {...this.getTableProps()} />
    }
}

export default ShipTable
