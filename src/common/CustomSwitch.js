import { Input, Switch } from 'antd'
import React from 'react'

const CustomSwitch = ({className, label, checkedText, uncheckedText, onChange, checked}) => {
  return (
    <div className={className}>
        {label && <div className='poppins-500-12 mb-1'>{label}</div>}
        <Switch
              className='custom-switch'
              checked={checked}
              checkedChildren={checkedText}
              unCheckedChildren={uncheckedText}
              onChange={onChange}
        />
    </div>
  )
}

export default CustomSwitch