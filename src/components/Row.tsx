import React, { Component } from 'react'
import Cell from './Cell'
import { CellDataExtended } from '../types/DataTypes'
import deepEqual from 'deep-equal'
import { CellProps, RowProps } from '../types/PropTypes'

class Row extends Component<RowProps> {
    shouldComponentUpdate(nextProps: Readonly<RowProps>): boolean {
        return !deepEqual(this.props, nextProps)
    }

    getCell(props: CellProps, key: number) {
        return <Cell {...props} key={key} />
    }

    transformCellData(cellData: CellDataExtended): CellProps {
        const { rowId } = this.props
        return {
            rowId: rowId,
            data: cellData.data,
            renderer: cellData.renderer,
            columnId: cellData.columnId,
            style: cellData.style,
            className: cellData.className
        }
    }

    render() {
        const { style, cellDataList, className } = this.props
        console.log('= render Row =')
        return (
            <tr style={style} className={className}>
                {cellDataList.map((cellData, index) => this.getCell(this.transformCellData(cellData), index))}
            </tr>
        )
    }
}

export default Row
