import React, {Component} from 'react';
import {CellData, ICellData, CellValue, RendererProps, ShipTable, ShipTableProps} from "shiptable"


class App extends Component<any>{

    buttonChangeRenderer = (props: RendererProps<string>): CellValue => {
        const { rowData, data} = props
        const rowId = rowData.id
        return <button
          disabled={!rowData.data.first?.data}
          onClick={() => {
        this.setState({
                ...this.state,
                rows: this.state.rows.map((row) => {
                      if(row.id === rowId) {return  {...row, data: {...row.data, third: {
                            ...row.data.third,
                        data: 'changed'
                      }}}}
                      return row
                    })

        })
      }}>{data}</button>
    }

    buttonDisableRenderer = (props: RendererProps<string>): CellValue => {
        const { rowData, data} = props
        if (data){
            return <button
                disabled={!rowData.data.first?.data}
                onClick={() => {
                    this.setState({
                        ...this.state,
                        rows: this.state.rows.map((row) => {
                            if (row.id === 'ccc'){
                                return {
                                    ...row,
                                    disabled: !row.disabled
                                }
                            }
                            return row
                        })

                    })
                }}>{data}</button>
        }else{
            return data
        }
    }


    inputRenderer = (props: RendererProps<string>): CellValue => {
        const { rowData, data } = props
        const rowId = rowData.id
        return <input
            value={data}
            type="text"
            onChange={(e) => {
                this.setState({
                    rows: this.state.rows.map((row) => {
                        return row.id === rowId ? {
                            ...row, data:
                                {...row.data,
                                    first: {
                                        ...row.data.first,
                                        data: e.target.value
                                    }
                                }
                        } : row
                    })
                })
            }
            }/>
    }


  state: ShipTableProps = {
      columns: [
        {
          id: 'first',
          title: 'Первый'
        },
        {
          id: 'second',
          title: 'Второй'
        },
        {
          id: 'third',
          title: 'Третий'
        },
      ],
      rows:[
        {
          id: 'aaa',
          data: {
            first: {
              data: '',
              renderer: this.inputRenderer
            } as ICellData<string>,
            second: new CellData<string>({
              data: "btn",
              renderer: this.buttonChangeRenderer
            }),
            third: new CellData<string>({
                renderer: this.buttonDisableRenderer
            })
          }
        },
        {
          id: 'bbb',
          data: {
            first: new CellData<string>({
              data: '',
              renderer: this.inputRenderer
            }),
            second: new CellData<string>({
              data: "btn",
              renderer: this.buttonChangeRenderer
            }),
            third: new CellData<string>({
                renderer: this.buttonDisableRenderer
            })
          }
        },
        {
          id: 'ccc',
          data: {
            first: new CellData<string>({
              data: '',
              renderer: this.inputRenderer
            }),
            second: new CellData<string>({
              data: "btn",
              renderer: this.buttonChangeRenderer
            }),
            third: new CellData<string>({
                renderer: this.buttonDisableRenderer
            })
          }
        }
      ]
  }

  reverseColumns = () => {
    this.setState({
        ...this.state,
        columns: this.state.columns.reverse()
    })
  }

  render(){
    return (
        <div>
            <button onClick={this.reverseColumns}>Перемешать</button>
            <ShipTable {...this.state} />
        </div>
        )
  }
}

export default App;
