import React, { Component } from 'react'
import { CellData, CellValue } from '../types/Types'
import deepEqual from 'deep-equal'

class Cell extends Component<CellData> {
    shouldComponentUpdate(nextProps: Readonly<CellData>): boolean {
        return !deepEqual(this.props.data, nextProps.data)
    }

    getValue = (): CellValue => {
        const { data } = this.props
        if (this.props.renderer) {
            return this.props.renderer(data)
        } else if (typeof this.props.data === 'string' || typeof this.props.data === 'number') {
            return this.props.data
        }
        return null
    }

    render() {
        const { style, className } = this.props
        console.log('=== render Cell ===')
        return (
            <td
                style={style}
                className={className}
            >
                {this.getValue()}
            </td>
        )
    }
}

export default Cell
