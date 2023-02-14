import { Divider } from 'antd';
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton';
import CustomCalendar from '../common/CustomCalendar';
import { useNavigate } from 'react-router-dom'
import client from '../helpers/axiosClient';
import CustomTable from '../common/CustomTable';

const Home = () => {

    const navigate = useNavigate()

    const [exerciseLog, setExerciseLog] = useState([])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '2vw',
            render: (text, record) => (
              <div className="">
                {text}
              </div>
            ),
          },
    ]

    const getExerciseLog = () => {
        client.get('/exercise-log' ).then((res) => {
            console.log(res.data)
            setExerciseLog(res.data)
          }).catch(e => {
            console.log(e,'error')
          }).finally(() => {
            
          })
    }

    useEffect(() => {
        getExerciseLog()
    },[])

    return (
        <div className='flex flex-col items-center'>
            <CustomCalendar />
            <Divider className='m-0 mb-10' />
           {<div className='flex flex-col items-center mb-5'>
                {exerciseLog.length === 0 && <div className='poppins-500-12'>No exercise logged</div>}
                <CustomButton 
                    className='flex flex-center mt-2' 
                    onClick={() => navigate('/log')}
                >Log session</CustomButton>
            </div> }
            {/* <CustomTable columns={columns} data={exerciseLog}/> */}
            <div className='w-[90%]'>
              {exerciseLog.map(({name, sets, reps, weight}) => 
                <div className='rounded-xl border border-ant-blue p-4 flex flex-col mb-2'>
                  <div className='poppins-500-14'>{name}</div>  
                  <div className='flex gap-2 poppins-500-12'>
                    <div>Sets: {sets}</div>
                    <div>Reps: {sets}</div>
                    <div>Weight: {sets}</div>
                  </div>
                </div>)}
            </div>
           
        </div>
        
    )
}

export default Home