import React from 'react'
import Cell from './Cell'

class HeaderCell extends Cell {
    render() {
        const { style, className } = this.props
        console.log('=== render HeaderCell ===')
        return (
            <th style={style} className={className?.join(' ')}>
                {this.getValue()}
            </th>
        )
    }
}

export default HeaderCell
