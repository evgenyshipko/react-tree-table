/* global JSX */

import { CSSProperties } from 'react'
import { RowIdType } from './PropTypes'

export interface CommonData {
    className?: string[],
    style?: CSSProperties
}

export interface ColumnData extends CommonData{
    id: string,
    title: string,
}

export type RowData = {
    id: string,
    data: Record<string, CellData>,
} & CommonData

export interface CellData<T = any> extends CommonData{
    data?: T
    renderer?: Renderer<T>
}

export interface CellDataExtended extends CellData{
    columnId: string
}

export interface TableData extends CommonData{
    columns: ColumnData[],
    rows: RowData[]
}

export type CellValue = string | number | JSX.Element | null

export type Renderer<T> = (props: RendererProps<T>) => CellValue

export type RendererProps<T> = Readonly<{ columnId: string, rowId: RowIdType, data: T }>
