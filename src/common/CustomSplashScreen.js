import { Spin } from 'antd'
import React from 'react'

const CustomSplashScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
        <div>
            <Spin tip="Loading app" size="large"></Spin>
        </div>
    </div>
  )
}

export default CustomSplashScreen