import React, { Component } from 'react';
import { TreeRowData, TreeTableData } from '../types/TreeDataTypes';
import { RowIdType } from '../types/PropTypes';
import { Renderer } from '../types/DataTypes';
import { HighOrderTable } from './HighOrderTable';

/* global HTMLButtonElement */

class TreeTable extends Component<TreeTableData> {
    state: TreeTableData = {
        columns: [],
        rows: [],
    };

    constructor(props: TreeTableData) {
        super(props);
        this.state = this.transformProps(props);
    }

    // componentDidUpdate(
    //     _prevProps: Readonly<TreeTableData>,
    //     _nextState: Readonly<TreeTableData>
    // ) {
    //     this.setState(this.transformProps(this.props));
    // }

    static getGroupedColumnId = (props: TreeTableData) => {
        let counter = 0;
        let columnId = '';
        props.columns.forEach((columnData) => {
            if (columnData.grouped) {
                counter++;
                columnId = columnData.id;
            }
        });
        if (counter === 0) {
            throw new Error('необходимо выбрать колонку для группировки');
        } else if (counter > 1) {
            throw new Error('колонка для группировки должна быть только одна');
        }
        return columnId;
    };

    static getChildRowsMapping = (
        props: TreeTableData
    ): Record<RowIdType, RowIdType[]> => {
        const result: Record<RowIdType, RowIdType[]> = {};
        props.rows.forEach((rowData) => {
            if (rowData.parentId) {
                const childIdArr = result[rowData.parentId];
                childIdArr
                    ? childIdArr.push(rowData.id)
                    : (result[rowData.parentId] = [rowData.id]);
            }
        });
        return result;
    };

    transformProps = (props: TreeTableData) => {
        const groupedColumnId = TreeTable.getGroupedColumnId(props);
        const childRowsMapping = TreeTable.getChildRowsMapping(props);
        const parentIdArr = Object.keys(childRowsMapping);
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
                                renderer: this.getTransformedRenderer(
                                    childRowsMapping[rowData.id],
                                    rowData.data[groupedColumnId].renderer,
                                    rowData.id
                                ),
                            },
                        },
                    };
                }
                return rowData;
            }),
        };
    };

    toggleHideRow = (rowData: TreeRowData): TreeRowData => {
        console.log('=== toggleHideRow ===');
        const hiddenClass = 'shiptable-hidden-row';
        if (rowData.className) {
            rowData.className.includes(hiddenClass)
                ? (rowData.className = rowData.className.filter(
                      (className) => className !== hiddenClass
                  ))
                : rowData.className.push(hiddenClass);
        } else {
            rowData.className = [hiddenClass];
        }
        if (rowData.className.length === 0) {
            rowData.className = undefined;
        }
        return rowData;
    };

    getTransformedRenderer = (
        childRowIdArr: string[],
        renderer?: Renderer<any>,
        rowId?: RowIdType
    ): Renderer<any> => {
        const groupedColumnId = TreeTable.getGroupedColumnId(this.props);
        let visibility = true;
        const getButton = () => {
            return (
                <button
                    onClick={() => {
                        visibility = !visibility;
                        this.setState({
                            ...this.state,
                            rows: this.state.rows.map((rowData) => {
                                if (childRowIdArr.includes(rowData.id)) {
                                    return this.toggleHideRow(rowData);
                                }
                                if (rowData.id === rowId && rowId) {
                                    // refresh +/- button state
                                    return {
                                        ...rowData,
                                        data: {
                                            ...rowData.data,
                                            [groupedColumnId]: {
                                                ...rowData.data[
                                                    groupedColumnId
                                                ],
                                                renderer: this.getTransformedRenderer(
                                                    childRowIdArr,
                                                    rowData.data[
                                                        groupedColumnId
                                                    ].renderer
                                                ),
                                            },
                                        },
                                    };
                                }
                                return rowData;
                            }),
                        });
                    }}
                >
                    {visibility ? '-' : '+'}
                </button>
            );
        };
        return (props) => (
            <>
                <div className="inline-block">{rowId ? getButton() : null}</div>
                <div className="inline-block">
                    {renderer ? renderer(props) : props.data}
                </div>
            </>
        );
    };

    render() {
        return <HighOrderTable {...this.state} />;
    }
}

export default TreeTable;
