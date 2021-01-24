import { ColumnData, RowData, TableData } from './DataTypes'

export type TreeRowData = {parentId?: string} & RowData

export type TreeColumnData = {grouped?: boolean} & ColumnData

export interface TreeTableData extends TableData{
    columns: TreeColumnData[],
    rows: TreeRowData[]
}
