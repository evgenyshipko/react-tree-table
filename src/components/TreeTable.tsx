import React, { Component } from 'react'
import { TreeRowData, TreeTableData } from '../types/TreeDataTypes'
import { RowIdType } from '../types/PropTypes'
import { Renderer } from '../types/DataTypes'
import ShipTable from './ShipTable'
import deepEqual from 'deep-equal'

// import deepEqual from 'deep-equal'

class TreeTable extends Component<TreeTableData> {
    state: TreeTableData = {
        columns: [],
        rows: []
    }

    static getDerivedStateFromProps(nextProps: TreeTableData, nextState: TreeTableData) {
        if (!deepEqual(nextProps, nextState)) {
            return TreeTable.transformProps(nextProps, nextState)
        }
        return {}
    }

    /* componentDidMount() {
        this.setState(this.transformProps(this.props))
    }*/

    static getGroupedColumnId = (props: TreeTableData) => {
        let counter = 0
        let columnId = ''
        props.columns.forEach((columnData) => {
            if (columnData.grouped) {
                counter++
                columnId = columnData.id
            }
        })
        if (counter === 0) {
            throw new Error('необходимо выбрать колонку для группировки')
        } else if (counter > 1) {
            throw new Error('колонка для группировки должна быть только одна')
        }
        return columnId
    }

    static getChildRowsMapping = (props: TreeTableData): Record<RowIdType, RowIdType[]> => {
        const result: Record<RowIdType, RowIdType[]> = {}
        props.rows.forEach((rowData) => {
            if (rowData.parentId) {
                const childIdArr = result[rowData.parentId]
                childIdArr ? childIdArr.push(rowData.id) : result[rowData.parentId] = [rowData.id]
            }
        })
        return result
    }

    static transformProps = (props: TreeTableData, state: TreeTableData) => {
        const groupedColumnId = TreeTable.getGroupedColumnId(props)
        const childRowsMapping = TreeTable.getChildRowsMapping(props)
        const parentIdArr = Object.keys(childRowsMapping)
        return {
            ...props,
            rows: props.rows.map((rowData) => {
                if (parentIdArr.includes(rowData.id)) {
                    return {
                        ...rowData,
                        data: {
                            ...rowData.data,
                            [groupedColumnId]: {
                                ...rowData.data[groupedColumnId],
                                renderer: TreeTable.getTransformedRenderer(state, childRowsMapping[rowData.id], rowData.data[groupedColumnId].renderer)
                            }
                        }
                    }
                }
                return rowData
            })
        }
    }

    static toggleHideRow = (rowData: TreeRowData) => {
        console.log('=== toggleHideRow ===')
        const hiddenClass = 'shiptable-hidden-row'
        if (rowData.className) {
            rowData.className.includes(hiddenClass)
                ? rowData.className = rowData.className.filter(className => className !== hiddenClass)
                : rowData.className.push(hiddenClass)
        } else {
            rowData.className = [hiddenClass]
        }
        return rowData
    }

    static getTransformedRenderer = (state: TreeTableData, childRowIdArr: string[], renderer?: Renderer<any>): Renderer<any> => {
        const button = (
            <button
                onClick={() => {
                    state.rows = state.rows.map((rowData) => {
                        if (childRowIdArr.includes(rowData.id)) {
                            return TreeTable.toggleHideRow(rowData)
                        }
                        return rowData
                    })
                }}>
                test
            </button>
        )
        if (renderer) {
            console.log('RENDEEEEEEEEEEEEEEEER')
            return (props) => <><div className='inline-block'>{button}</div><div className='inline-block'>{renderer(props)}</div></>
        } else {
            return (props) => <><div className='inline-block'>{button}</div><div className='inline-block'>{props.data}</div></>
        }
    }

    render() {
        return <ShipTable {...this.state} />
    }
}

export default TreeTable
