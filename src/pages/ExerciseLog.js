import { useState } from 'react';
import client from '../helpers/axiosClient';
import CustomSelect from '../common/CustomSelect';
import CustomSwitch from '../common/CustomSwitch';
import CustomInputNumber from '../common/CustomInputNumber';

import { useFormik } from 'formik';
import * as Yup from 'yup'
import CustomButton from '../common/CustomButton';
import { Tooltip } from 'antd';
import { CaretLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const RepWeightInput = ({index, reps, weight, onChange}) => 
<div className='flex gap-4 items-center justify-center2 mb-5'>
  <div className='flex-1'>
    <CustomInputNumber 
      label='Reps' 
      name='reps'
      value={reps}
      min={1}
      onChange={(value) => {
        console.log(value)
        onChange('reps', value, index)
        // formik.setFieldValue('reps', value)
      }}
      // formikHook={formik}
    />
  </div>
  <div className='flex-1'>
    <CustomInputNumber
      label='Weight'
      name='weight'
      min={2.5}
      step={2.5}
      value={weight}
      onChange={(value) => {
        console.log(value)
        onChange('weight', value,index)
        // formik.setFieldValue('weight', value)
      }}
      // formikHook={formik}
    />
  </div>
</div>

const ExerciseLog = () =>  {
  const [options, _setOptions] = useState({
    exercises: []
  })
  const setOptions = (field, value) => _setOptions({...options, [field] : value})

  const [loading, _setLoading] = useState({
    exercises: false
  })
  const setLoading = (field, value) => _setLoading({...options, [field] : value})

  const [logging, setLogging] = useState(false)

  const navigate = useNavigate()

  const DEFAULT_SETS = 3
  const DEFAULT_REPS = 15
  const DEFAULT_WEIGHT = 2.5

  const handleLogExercise = (values) => {
    console.log('onSubmit', values)
    const {selectedExercise : name, isConsistent, sets, repList} = values

    const payload = {
      name, isConsistent, sets, repList
    }

    setLogging(true)
    client.post('/log-exercise', payload ).then((res) => {
      console.log(res)
      formik.resetForm()
    }).catch(e => {
      console.log(e,'error')
    }).finally(() => {
      setLogging(false)
    })
  }

  const formik = useFormik({
    initialValues: {
      selectedExercise: null,
      isConsistent: true,
      sets: DEFAULT_SETS,
      repList: [{reps: DEFAULT_REPS, weight: DEFAULT_WEIGHT}]
    },
    validationSchema: Yup.object({
      selectedExercise: Yup.string().required('Please select an exercise').typeError('Please select an exercise'),
      isConsistent: Yup.bool(),
      sets: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
      repList: Yup.array()
      .of(Yup.object().shape({
        reps: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
        weight: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
        // Rest of your repweigth object properties
      }))
      // reps: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
      // weight: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
    }),
    onSubmit: values => {
      handleLogExercise(values)
    },
  });

  const getExcercises = (name) => {
    if(!name) return
    setLoading('exercises', true)
    client.get('/exercise', { params: {name} }).then((res) => {
      console.log(res.data)
      setOptions('exercises', res.data)
    }).catch(e => {
      console.log(e,'error')
    }).finally(() => {
      setLoading('exercises', false)
    })
  }

  console.log('formik.values', formik.values)

  return (
    <div className='pt-5 h-screen p-5 bg-red'>
      <div>
        <CustomButton 
          type='dashed' 
          icon={<CaretLeftOutlined />}
          onClick={() => navigate(-1)}
        >Back</CustomButton>
      </div>
        <form onSubmit={formik.handleSubmit} className='w-full mt-10 flex flex-col items-center'>
          <CustomSelect
            className='w-full mb-5'
            label='Exercise name'
            name='selectedExercise'
            placeholder='Select exercise'
            value={formik.values.selectedExercise}
            options={options.exercises} 
            debounceSearch
            onSearch={(e) => getExcercises(e)}
            onSelect={value => {
              console.log(value)
              formik.setFieldValue('selectedExercise', value)
            }}
            optionSuffix={(option) =>   
              <Tooltip title={<div className='poppins-500-11' onClick={() => {
                console.log('gefe')
                window.focus()
              }}>{option.instructions}</div>} placement='bottom' trigger='click'>
                <div><InfoCircleOutlined /></div>
              </Tooltip>}
            labelKey='name'
            valueKey='name'
            randomKey
            loading={loading.exercises}
            formikHook={formik}
          />

          <div className='flex gap-4 items-center justify-center mb-5'>
            <div className='flex-1'>
              <CustomInputNumber 
                name='sets'
                label='Sets'
                min={1}
                value={formik.values.sets}
                onChange={(value) => {
                  console.log(value)
                  formik.setFieldValue('sets', value)
                  if(!formik.values.isConsistent) formik.setFieldValue('repList', Array.from(Array(value).keys()).map(() => { return {reps: DEFAULT_REPS, weight: DEFAULT_WEIGHT} }))
                }}
                formikHook={formik}
              />
            </div>
            <div className='flex-1'>
                {formik.values.sets > 1 && <CustomSwitch
                  className='mt-5'
                  checked={formik.values.isConsistent}
                  checkedText="Consistent"
                  uncheckedText="Variant"
                  onChange={(isConsistent) => {
                    console.log(isConsistent)
                    formik.setFieldValue('isConsistent', isConsistent)
                    if(!isConsistent) formik.setFieldValue('repList', Array.from(Array(formik.values.sets).keys()).map(() => { return {reps: DEFAULT_REPS, weight: DEFAULT_WEIGHT} }))

                  }}
                />}
            </div>
          </div>
          <div>
            {formik.values.isConsistent ?
              <RepWeightInput 
                formikHook={formik} 
                index={0}
                reps={formik.values.repList[0].reps} 
                weight={formik.values.repList[0].weight} 
                onChange={(key, value, index) => {
                  const list = formik.values.repList
                  list[index] = {...list[index], [key]: value}
                  formik.setFieldValue('repList', list)
                }}
              />
              : <>
                {formik.values.repList.length > 0 
                  && formik.values.repList.map(({reps,weight},i) => 
                    <div key={i}>
                      <div className='flex items-center'>
                        <div className='mr-3'>{i+1 < 10 ? 0:''}{i + 1}</div>
                        <RepWeightInput 
                          formikHook={formik} 
                          index={i}
                          weight={weight} 
                          reps={reps}
                          onChange={(key, value, index) => {
                            let list = [...formik.values.repList]
                            list[index] = {...list[index], [key]: value}
                            console.log(list)
                            formik.setFieldValue('repList', list)
                          }}  
                        />
                      </div>
                    </div>
              )}
              </>
              } 
          </div>
          <CustomButton 
            className='flex flex-center mt-5 mb-10' 
            onClick={() => formik.handleSubmit()}
            loading={logging}
          >Log Exercise</CustomButton>
        </form>
      </div>
  );
}

export default ExerciseLog;
