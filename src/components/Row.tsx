import React, { Component, CSSProperties } from 'react'
import Cell from './Cell'
import { ICellData } from '../types/Types'
import deepEqual from 'deep-equal'

export interface RowProps {
    cellDataList: ICellData[]
    style?: CSSProperties
    className?: string
}

class Row extends Component<RowProps> {
    shouldComponentUpdate(nextProps: Readonly<RowProps>): boolean {
        return !deepEqual(this.props.cellDataList, nextProps.cellDataList)
    }

    getCell(props: ICellData, key: number) {
        return <Cell {...props} key={key} />
    }

    render() {
        const { style, cellDataList, className } = this.props
        console.log('=== render Row ===')
        return (
            <tr style={style} className={className}>
                {cellDataList.map((cellData, index) => this.getCell(cellData, index))}
            </tr>
        )
    }
}

export default Row
