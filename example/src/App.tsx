import React, { Component } from 'react'
import { CellData, CellValue, RendererProps, ShipTable, ShipTableProps } from 'shiptable'

type TestData = {value: string, disabled: boolean}

class App extends Component<any> {
    buttonChangeRenderer = (props: RendererProps<TestData>): CellValue => {
        const { rowId, data } = props
        return <button
            disabled={data.disabled}
            onClick={() => {
                this.setState({
                    ...this.state,
                    rows: this.state.rows.map((row) => {
                        if (row.id === rowId) {
                            return {
                                ...row,
                                data: {
                                    ...row.data,
                                    third: {
                                        ...row.data.third,
                                        data: 'changed'
                                    }
                                }
                            }
                        }
                        return row
                    })

                })
            }}>{data.value}</button>
    }

    buttonDisableRenderer = (props: RendererProps<string>): CellValue => {
        const { data } = props
        if (data) {
            return <button>{data}</button>
        } else {
            return data
        }
    }

    inputRenderer = (props: RendererProps<string>): CellValue => {
        const { rowId, data } = props
        return <input
            value={data}
            type="text"
            onChange={(e) => {
                this.setState({
                    rows: this.state.rows.map((row) => {
                        return row.id === rowId
                            ? {
                                ...row,
                                data:
                                {
                                    ...row.data,
                                    first: {
                                        ...row.data.first,
                                        data: e.target.value
                                    },
                                    second: {
                                        ...row.data.second,
                                        data: {
                                            ...row.data.second.data,
                                            disabled: false
                                        } as TestData
                                    }
                                }
                            }
                            : row
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
          }
      ],
      rows: [
          {
              id: 'aaa',
              data: {
                  first: {
                      data: '',
                      renderer: this.inputRenderer
                  } as CellData<string>,
                  second: {
                      data: { value: 'btn', disabled: true },
                      renderer: this.buttonChangeRenderer
                  } as CellData<TestData>,
                  third: {
                      renderer: this.buttonDisableRenderer
                  } as CellData<string>
              }
          },
          {
              id: 'bbb',
              data: {
                  first: {
                      data: '',
                      renderer: this.inputRenderer
                  } as CellData<string>,
                  second: {
                      data: { value: 'btn', disabled: true },
                      renderer: this.buttonChangeRenderer
                  } as CellData<TestData>,
                  third: {
                      renderer: this.buttonDisableRenderer
                  } as CellData<string>
              }
          },
          {
              id: 'ccc',
              data: {
                  first: {
                      data: '',
                      renderer: this.inputRenderer
                  } as CellData<string>,
                  second: {
                      data: { value: 'btn', disabled: true },
                      renderer: this.buttonChangeRenderer
                  } as CellData<TestData>,
                  third: {
                      renderer: this.buttonDisableRenderer
                  } as CellData<string>
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

  render() {
      return (
          <div>
              <button onClick={this.reverseColumns}>Перемешать</button>
              <ShipTable {...this.state} />
          </div>
      )
  }
}

export default App
