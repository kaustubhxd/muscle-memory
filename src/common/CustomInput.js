import { Input } from 'antd'
import React from 'react'

const CustomInput = ({placeholder, className, label, value, onChange, formikHook: formik, showError, errorText, name}) => {


  if (formik && name) {
    showError = showError || (formik.touched[name] && !!formik.errors[name])
    errorText = errorText || (formik.touched[name] && formik.errors[name])
  }

  const handleChange = (e) => onChange(e, e.target.value)

  return (
    <div className={className}>
        {label && <div className='poppins-500-12 mb-1'>{label}</div>}
        <Input 
          placeholder={placeholder} 
          status={showError ? 'error' : ''}
          value={value}
          onChange={handleChange}
        />
        {/* {showError && <div className='poppins-500-12 mb-1'>{errorText}</div>} */}
    </div>
  )
}

export default CustomInput