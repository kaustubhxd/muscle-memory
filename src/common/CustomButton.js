import { Button, Input } from 'antd'
import React from 'react'

const CustomButton = ({className, label, children, type='primary', onClick, shape, icon,
                        formikHook: formik, showError, errorText, name,loading}) => {

  if (formik && name) {
    showError = showError || (formik.touched[name] && !!formik.errors[name])
    errorText = errorText || (formik.touched[name] && formik.errors[name])
  }

  return (
    <div className={className}>
        <Button 
            className={`custom-button-${type}`}
            status={showError ? "error" : ''}
            type={type} 
            loading={loading} 
            onClick={onClick}
            shape={shape} icon={icon}
        >
          {children}
        </Button>
    </div>
  )
}

export default CustomButton