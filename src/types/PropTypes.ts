import { CellDataExtended, Renderer } from './DataTypes';
import { CSSProperties } from 'react';

interface CommonProps {
    className?: string[];
    style?: CSSProperties;
}

export interface CellProps<T = any> extends CommonProps {
    data: T;
    renderer?: Renderer<T>;
    columnId: string;
    rowId: RowIdType;
}

export interface RowProps extends CommonProps {
    cellDataList: CellDataExtended[];
    rowId: RowIdType;
}

export interface TableProps extends CommonProps {
    rowList: RowProps[];
    header: RowProps;
}

export type RowIdType = string;
