import { useState } from 'react';
import client from '../helpers/axiosClient';
import CustomSelect from '../common/CustomSelect';
import CustomSwitch from '../common/CustomSwitch';
import CustomInputNumber from '../common/CustomInputNumber';

import { Field, FieldArray, useFormik } from 'formik';
import * as Yup from 'yup'
import debounce from 'lodash.debounce';
import CustomButton from '../common/CustomButton';
import { Button, Form } from 'antd';
import { BackwardFilled, CaretLeftOutlined, HomeOutlined, LeftCircleOutlined, LeftOutlined, SearchOutlined } from '@ant-design/icons';
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
  const navigate = useNavigate()

  const DEFAULT_SETS = 3
  const DEFAULT_REPS = 15
  const DEFAULT_WEIGHT = 2.5


  const formik = useFormik({
    initialValues: {
      selectedExercises: null,
      isConsistent: true,
      sets: DEFAULT_SETS,
      repWeightList: [{reps: DEFAULT_REPS, weight: DEFAULT_WEIGHT}]
    },
    validationSchema: Yup.object({
      selectedExercises: Yup.string().required('Please select an exercise').typeError('Please select an exercise'),
      isConsistent: Yup.bool(),
      sets: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
      repWeightList: Yup.array()
      .of(Yup.object().shape({
        reps: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
        weight: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
        // Rest of your repweigth object properties
      }))
      // reps: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
      // weight: Yup.number().required('Please enter the number of sets').typeError('Please enter the number of sets').min(1),
    }),
    onSubmit: values => {
      console.log('onSubmit', values)
    },
  });

  const getExcercises = (name) => {
    if(!name) return
    setLoading('exercises', true)
    client.get('', { params: {name} }).then((res) => {
      console.log(res.data,res)
      // formik.setFieldValue('exercises', res.data)
      setOptions('exercises', res.data)
    }).catch(e => {
      console.log(e)
    }).finally(() => {
      setLoading('exercises', false)
    })
  }

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
            name='selectedExercises'
            placeholder='Select exercise'
            value={formik.values.selectedExercises}
            options={options.exercises} 
            debounceSearch
            onSearch={(e) => getExcercises(e)}
            onSelect={value => {
              console.log(value)
              formik.setFieldValue('selectedExercises', value)
            }}
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
                  if(!formik.values.isConsistent) formik.setFieldValue('repWeightList', Array.from(Array(value).keys()).map(() => { return {reps: DEFAULT_REPS, weight: DEFAULT_WEIGHT} }))
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
                    if(!isConsistent) formik.setFieldValue('repWeightList', Array.from(Array(formik.values.sets).keys()).map(() => { return {reps: DEFAULT_REPS, weight: DEFAULT_WEIGHT} }))

                  }}
                />}
            </div>
          </div>
          <div>
            {formik.values.isConsistent ?
              <RepWeightInput 
                formikHook={formik} 
                index={0}
                reps={formik.values.repWeightList[0].reps} 
                weight={formik.values.repWeightList[0].weight} 
                onChange={(key, value, index) => {
                  const list = formik.values.repWeightList
                  list[index] = {...list[index], [key]: value}
                  formik.setFieldValue('repWeightList', list)
                }}
              />
              : <>
                {formik.values.repWeightList.length > 0 
                  && formik.values.repWeightList.map(({reps,weight},i) => 
                    <div key={i}>
                      <div className='flex items-center'>
                        <div className='mr-3'>{i+1 < 10 ? 0:''}{i + 1}</div>
                        <RepWeightInput 
                          formikHook={formik} 
                          index={i}
                          weight={weight} 
                          reps={reps}
                          onChange={(key, value, index) => {
                            let list = [...formik.values.repWeightList]
                            list[index] = {...list[index], [key]: value}
                            console.log(list)
                            formik.setFieldValue('repWeightList', list)
                          }}  
                        />
                      </div>
                    </div>
              )}
              </>
              } 
          </div>
          <CustomButton className='flex flex-center mt-5 mb-10' onClick={() => formik.handleSubmit()}>Log Exercise</CustomButton>
        </form>
      </div>
  );
}

export default ExerciseLog;
