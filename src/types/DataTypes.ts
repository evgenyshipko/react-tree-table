/* global JSX */

import { CSSProperties } from 'react'
import { RowIdType } from './PropTypes'

export interface CommonData {
    className?: string,
    style?: CSSProperties
}

export interface ColumnData extends CommonData{
    id: string,
    title: string,
}

export type RowData = Readonly<{
    id: string,
    data: Readonly<Record<string, CellData>>,
} & CommonData>

export interface CellData<T = any> extends CommonData{
    data?: T
    renderer?: Renderer<T>
}

export interface CellDataExtended extends CellData{
    columnId: string
}

export type CellValue = string | number | JSX.Element | null

export type Renderer<T> = (props: RendererProps<T>) => CellValue

export type RendererProps<T> = Readonly<{ columnId: string, rowId: RowIdType, data: T }>
