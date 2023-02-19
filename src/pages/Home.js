import { Divider } from 'antd';
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton';
import CustomCalendar from '../common/CustomCalendar';
import { useNavigate } from 'react-router-dom'
import client from '../helpers/axiosClient';
import CustomTable from '../common/CustomTable';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';

var objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

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

    console.log(process.env)

    const getExerciseLog = (date = dayjs().format('YYYY-MM-DD') ) => {
        client.get('/exercise/exercise-log', {params: {date}} ).then((res) => {
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

    const repWeightInfo = (reps,weight, setNumber) => <div className='flex gap-2 poppins-500-12'>
    {setNumber && <div>{setNumber < 10 ? 0 : ''}{setNumber}</div>}
    <div>Reps: {reps}</div>
    <div>Weight: {weight}</div>
  </div>

    const renderSets = (reps,weight, is_consistent) => {
      if(is_consistent) return repWeightInfo(reps,weight)
      return reps.split(',').map((repsInstance, index) => repWeightInfo(repsInstance, weight.split(',')[index], index + 1))
    }

    const [selectedDay, setSelectedDay] = useState(null);


    return (
        <div className='flex flex-col items-center'>
            <CustomCalendar 
              value={selectedDay} 
              onChange={(date) => {
                // console.log(a,b,c)
                console.log(date)
                const {day,month,year} = date
                const formatDate = dayjs({day,month: month - 1, year}).format('YYYY-MM-DD')
                console.log(formatDate)

                setSelectedDay(date)

                getExerciseLog(formatDate)
              }} 
            />
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
              {exerciseLog.map(({name, sets, reps, weight, isConsistent, createdOn}) => 
                <div className='rounded-xl border border-ant-blue p-4 flex flex-col mb-2' key={createdOn}>
                  <div className='poppins-500-14'>{name}</div>  
                  {createdOn && 
                    <div className='poppins-500-11 flex items-center gap-1'>
                      <ClockCircleOutlined />
                      <div>
                        {dayjs.utc(createdOn).local().format('hh:mm A')}
                      </div>

                    </div>}
                  <div className='mt-2'>{renderSets(reps,weight, isConsistent)}</div>
                </div>)}
            </div>
           
        </div>
        
    )
}

export default Home