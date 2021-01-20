import React, { Component, CSSProperties } from 'react'
import Cell from './Cell'
import { CellData } from '../types/Types'
import deepEqual from 'deep-equal'

export interface RowProps {
    cellDataList: CellData[]
    style?: CSSProperties
    className?: string
}

class Row extends Component<RowProps> {
    shouldComponentUpdate(nextProps: Readonly<RowProps>): boolean {
        return !deepEqual(this.props.cellDataList, nextProps.cellDataList)
    }

    getCell(props: CellData) {
        return <Cell {...props} />
    }

    render() {
        const { style, cellDataList, className } = this.props
        console.log('=== render Row ===')
        return (
            <tr style={style} className={className}>
                {cellDataList.map((cellData) => this.getCell(cellData))}
            </tr>
        )
    }
}

export default Row
