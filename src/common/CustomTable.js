import { Table } from 'antd'
import React from 'react'

const CustomTable = ({columns, data}) => {

    


  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default CustomTable