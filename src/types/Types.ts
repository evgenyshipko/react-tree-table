/* global JSX */

import { CSSProperties } from 'react'

export interface ColumnData {
    id: string,
    title: string,
    className?: string,
    style?: CSSProperties
}

export interface RowData {
    id: string,
    data: Record<string, ICellData>,
    className?: string,
    style?: CSSProperties
}

export interface ICellData<T = any> {
    data?: T
    className?: string
    style?: CSSProperties
    renderer?: Renderer<T>
}

export type CellValue = string | number | JSX.Element | null

export type Renderer<T = any> = (data: T) => CellValue
