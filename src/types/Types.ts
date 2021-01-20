/* global JSX */

import { CSSProperties } from 'react'

export interface ColumnData {
    id: string,
    title: string,
    className?: string
    style?: CSSProperties
}

export interface RowData {
    id: string,
    data: Record<string, CellData>,
    className?: string
    style?: CSSProperties
}

export interface CellData<T = any> {
    data?: T
    className?: string
    style?: CSSProperties
    renderer?: (data: T) => CellValue
}

export type CellValue = string | number | JSX.Element | null
