import { Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';


import React, { useCallback, useState } from 'react'
import { FrownOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';

const { Option } = Select

const CustomSelect = ({placeholder, options, name, className, onSearch, onSelect, suffix, debounceSearch, value,
  valueKey, labelKey, randomKey = false, loading, label, formikHook: formik, showError, errorText, optionSuffix}) => {

    if (formik && name) {
      showError = showError || (formik.touched[name] && !!formik.errors[name])
      errorText = errorText || (formik.touched[name] && formik.errors[name])
    }

    const [typing, setTyping] = useState(false)

    const [searchText, setSearchText] = useState(null)

    const handleDebounce = (e) => {
      onSearch(e)
      setTyping(false)
    }

    // https://stackoverflow.com/questions/36294134/lodash-debounce-with-react-input
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(debounce(handleDebounce, debounceSearch ? 700 : 0), []);

    const handleSearch =  (e) => {
      setSearchText(e)
      setTyping(true)
      debounceFn(e);
    }

  return (
    <div className={className}>
        {label && <div className='poppins-500-12 mb-1'>{label}</div>}
        <Select
            className='w-full'
            showSearch
            value={value}
            status={showError ? "error" : ''}
            placeholder={placeholder}
            // optionFilterProp="children"
            onChange={onSelect}
            onSearch={handleSearch}
            // filterOption={(input, option) =>
            //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            // }
            // loading={loading}
            suffixIcon={loading ? <LoadingOutlined style={{color: '#4096ff', fontSize: '20'}} /> : suffix}
            notFoundContent={
            <div className='h-20 flex-col flex-center cursor-default'>
              {searchText ? typing ? <LoadingOutlined style={{fontSize: '40px'}} /> 
                : loading ? <LoadingOutlined style={{fontSize: '40px'}} /> : <FrownOutlined style={{fontSize: '40px'}} /> 
                  : <SearchOutlined style={{fontSize: '40px'}} />}
                <div className='mt-2'>
                  {searchText ? typing ? 'Searching exercies' : loading ? 'Searching exercies' : 'Unable to find exercise' : 'Type to search exercise'}
                </div>
            </div>}
        >
            {options.map((option) => (
              <Option key={randomKey ? uuidv4() : option[valueKey]} value={option[valueKey]}>
                <div className='flex justify-between'>
                  <div>{option[labelKey]}</div>
                  <div 
                  onClick={(e) => e.stopPropagation()}>
                    {optionSuffix(option)}
                  </div>
                </div>
                
              </Option>
            ))}
        </Select>
        {showError && <div className='poppins-500-11 mb-1 text-crimson mt-0.5'>{errorText}</div>}
    </div>
    
  )
}

export default CustomSelect