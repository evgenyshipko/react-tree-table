import React, { FC, memo, useMemo } from 'react';
import { CellProps } from '../types/PropTypes';

export const Cell: FC<CellProps> = memo(
    ({ style, className, rowId, columnId, renderer, data }) => {
        console.log(`= render Cell rowId: ${rowId}, columnId: ${columnId} =`);

        const value = useMemo(() => {
            if (renderer) {
                return renderer({ columnId, rowId, data });
            } else if (typeof data === 'string' || typeof data === 'number') {
                return data;
            }
            return null;
        }, [data]);

        return (
            <td
                style={style}
                className={className?.reduce((a, b) => a + ' ' + b)}
            >
                {value}
            </td>
        );
    }
);
