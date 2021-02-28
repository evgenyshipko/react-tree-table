import React, { FC, memo } from 'react';
import { TableData } from 'src/types/DataTypes';
import { Table } from '@components/Table';
import { RowProps, TableProps } from '../types/PropTypes';

export const HighOrderTable: FC<TableData> = memo(
    ({ columns, rows, className, style }) => {
        const columnOrder = () => {
            return columns.map((columnData) => columnData.id);
        };

        const getTableProps = (): TableProps => {
            const header: RowProps = {
                rowId: 'header',
                cellDataList: columns.map((columnData) => ({
                    columnId: columnData.id,
                    data: columnData.title,
                    className: columnData.className,
                    style: columnData.style,
                })),
            };

            const rowList: RowProps[] = rows.map((rowData) => {
                return {
                    rowId: rowData.id,
                    cellDataList: columnOrder().map((columnId) => ({
                        ...rowData.data[columnId],
                        columnId: columnId,
                    })),
                    style: rowData.style,
                    className: rowData.className,
                };
            });

            return { header, rowList, className, style };
        };

        return <Table {...getTableProps()} />;
    }
);
