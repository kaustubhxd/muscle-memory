import { Input, InputNumber } from 'antd'
import React from 'react'

const CustomInput = ({placeholder, className, label, value, onChange, 
  formikHook: formik, showError, errorText, name, min,max, step}) => {


  if (formik && name) {
    showError = showError || (formik.touched[name] && !!formik.errors[name])
    errorText = errorText || (formik.touched[name] && formik.errors[name])
  }

  const handleChange = (value) => onChange(value)

  return (
    <div className={className}>
        {label && <div className='poppins-500-12 mb-1'>{label}</div>}
        <InputNumber
          min={min} max={max} step={step}
          placeholder={placeholder} 
          status={showError ? 'error' : ''}
          value={value}
          onChange={handleChange}
          onFocus={(event) => event.target.select()}
        />
    </div>
  )
}

export default CustomInput