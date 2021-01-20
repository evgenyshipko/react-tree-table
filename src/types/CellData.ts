import { ICellData } from '../index'
import { CSSProperties } from 'react'
import { Renderer } from './Types'

class CellData<T> implements ICellData<T> {
    data?: T
    className?: string
    style?: CSSProperties
    renderer?: Renderer<T>

    constructor(props: ICellData<T>) {
        this.data = props.data
        this.renderer = props.renderer
        this.className = props.className
        this.style = props.style
    }
}
export default CellData
