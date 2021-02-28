import React, { FC, memo, useMemo } from 'react';
import { Row } from './Row';
import { TableProps } from '../types/PropTypes';

export const Table: FC<TableProps> = memo(
    ({ rowList, header, className, style }) => {
        console.log('=== render Table ===');

        const rows = useMemo(() => {
            return rowList.map((rowData, index) => (
                <Row {...rowData} key={index} />
            ));
        }, [rowList]);

        return (
            <table style={style} className={className?.join(' ')}>
                <thead>
                    <Row {...header} />
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
);
