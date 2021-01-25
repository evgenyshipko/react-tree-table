import { ColumnData, RowData, TableData } from './DataTypes'

export type TreeRowData = { parentId?: string, level?: number } & RowData

export type TreeColumnData = { grouped?: boolean } & ColumnData

export interface TreeTableData extends TableData{
    columns: TreeColumnData[],
    rows: TreeRowData[]
}
