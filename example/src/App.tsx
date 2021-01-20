import React, {Component} from 'react';
import './App.css';
import {ShipTable, ShipTableProps, CellValue} from "shiptable";

interface State {
  tableData: ShipTableProps
}


class App extends Component<any>{

  myRender = (data: string): CellValue => {
    return <button onClick={() => {
      this.setState({
          tableData: {
              ...this.state.tableData,
              rows: this.state.tableData.rows.map((row) => {
                    return row.id === 'bbb' ? {...row, data: {...row.data, first: {data: 'heer'}}} : row
                  })
          }
      })
    }}>{data}</button>
  }

  state: State = {
    tableData: this.getTableData()
  }

  getTableData(): ShipTableProps{
    return {
      columns: [
        {
          id: 'second',
          title: 'Второй'
        },
        {
          id: 'first',
          title: 'Первый'
        },
      ],
      rows:[
        {
          id: 'aaa',
          data: {
            first: {
              data: '1212',
              renderer: this.myRender
            },
            second: {
              data: 'privet'
            }
          }
        },
        {
          id: 'bbb',
          data: {
            first: {
              data: 'poka'
            },
            second: {
              data: 'poka'
            }
          }
        }
      ]
    }
  }

  render(){
    return <ShipTable {...this.state.tableData} />
  }
}

export default App;
