import React, { Component } from 'react'
import { CellValue, ICellData } from '..'
import deepEqual from 'deep-equal'

class Cell extends Component<ICellData> {
    shouldComponentUpdate(nextProps: Readonly<ICellData>): boolean {
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
                key={this.props.key}
                style={style}
                className={className}
            >
                {this.getValue()}
            </td>
        )
    }
}

export default Cell
