import React, { Component } from 'react'
import { CellData, CellValue } from '..'
import { CellProps } from '../types/PropTypes'

import deepEqual from 'deep-equal'

class Cell extends Component<CellProps> {
    shouldComponentUpdate(nextProps: Readonly<CellData>): boolean {
        return !deepEqual(this.props, nextProps)
    }

    getValue = (): CellValue => {
        const { data, columnId, rowId } = this.props
        if (this.props.renderer) {
            return this.props.renderer({ columnId, rowId, data })
        } else if (typeof this.props.data === 'string' || typeof this.props.data === 'number') {
            return this.props.data
        }
        return null
    }

    render() {
        const { style, className } = this.props
        console.log('= render Cell =')
        return (
            <td
                style={style}
                className={className?.reduce((a, b) => a + ' ' + b)}
            >
                {this.getValue()}
            </td>
        )
    }
}

export default Cell
