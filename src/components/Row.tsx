import React, { FC, memo, useMemo } from 'react';
import { Cell } from './Cell';
import { CellDataExtended } from '../types/DataTypes';
import { CellProps, RowProps } from '../types/PropTypes';

export const Row: FC<RowProps> = memo(
    ({ style, cellDataList, className, rowId }) => {
        const transformCellData = (cellData: CellDataExtended): CellProps => {
            return {
                rowId: rowId,
                data: cellData.data,
                renderer: cellData.renderer,
                columnId: cellData.columnId,
                style: cellData.style,
                className: cellData.className,
            };
        };

        const cellList = useMemo(() => {
            return cellDataList.map((cellData, index) => {
                return <Cell {...transformCellData(cellData)} key={index} />;
            });
        }, [cellDataList]);

        console.log(`= render Row: ${rowId} =`);
        return (
            <tr style={style} className={className?.join(' ')}>
                {cellList}
            </tr>
        );
    }
);
