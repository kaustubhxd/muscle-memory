import { Divider, Dropdown, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import CustomButton from '../common/CustomButton';
import CustomCalendar from '../common/CustomCalendar';
import { useNavigate } from 'react-router-dom'
import client from '../helpers/axiosClient';
import CustomTable from '../common/CustomTable';
import dayjs from 'dayjs';
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import ThreeDots from '../svg/ThreeDots';

var objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const Home = () => {

    const navigate = useNavigate()

    const [exerciseLog, setExerciseLog] = useState([])
    const [exerciseLogLoading, setExerciseLogLoading] = useState(true)

    const getExerciseLog = (date = dayjs().utc().format('YYYY-MM-DD') ) => {
        setExerciseLogLoading(true)
        client.get('/exercise/exercise-log', {params: {date}} ).then((res) => {
            setExerciseLog(res.data)
          }).catch(e => {
            console.log(e,'error')
          }).finally(() => {
            setExerciseLogLoading(false)
          })
    }

    useEffect(() => {
        getExerciseLog()
    },[])

    const repWeightInfo = (reps,weight, setNumber, sets) => <div className='flex gap-2 poppins-500-12'>
    {setNumber ? <div>{setNumber < 10 ? 0 : ''}{setNumber}</div> : null}
    {sets && <div>Sets: {sets}</div>}
    <div>Reps: {reps}</div>
    <div>Weight: {weight}</div>
  </div>

    const renderSets = (reps,weight,sets, isConsistent) => {
      if(isConsistent) return repWeightInfo(reps,weight, sets)
      return reps.split(',').map((repsInstance, index) => repWeightInfo(repsInstance, weight.split(',')[index], index + 1))
    }

    const [selectedDay, setSelectedDay] = useState(undefined);

    const [deleteModal, setDeleteModal] = useState({
      show: false,
      data: null
    })

    const DOT_ACTION = {
      EDIT: 1,
      DELETE: 2
    }
    const items = [
      {key: DOT_ACTION.EDIT, label: 'Edit', icon: <EditOutlined />},
      {key: DOT_ACTION.DELETE, label: 'Delete', icon: <DeleteOutlined />},
    ]
    const menuProps = {
      items,
      onClick: ({key}) => {
        switch(+key){
          case DOT_ACTION.EDIT:
            console.log('edit')
            break;
          case DOT_ACTION.DELETE:
            console.log('delete')
            setDeleteModal({...deleteModal, show: true})
            break;
          default:
            break
        }
      },
    };

    const handleDeleteLog = ({id}) => {
      setExerciseLogLoading(true)
      client.delete('/exercise/log-delete', {params: {id}} ).then((res) => {
        console.log(res)
        getExerciseLog(selectedDay)
        const {day,month,year} = selectedDay
        const formatDate = dayjs({day,month: month - 1, year}).utc().format('YYYY-MM-DD')
        getExerciseLog(formatDate)
      }).catch(e => {
        console.log(e,'error')
      }).finally(() => {
        setExerciseLogLoading(false)
        setDeleteModal({show: false})
      })
    }


    return (
        <div className='flex flex-col items-center'>
            <CustomCalendar 
              value={selectedDay} 
              onChange={(date) => {
                // console.log(date)
                const {day,month,year} = date
                const formatDate = dayjs({day,month: month - 1, year}).utc().format('YYYY-MM-DD')
                // console.log(formatDate)

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
              {exerciseLogLoading && 
                <div className='w-full flex items-center justify-center mb-3'>
                  <LoadingOutlined style={{ fontSize: 24 }} spin />
                </div>}
              {exerciseLog.map(({id,name, sets, reps, weight, isConsistent, createdOn}) => 
                <div className='rounded-xl relative border border-ant-blue p-4 flex flex-col mb-2' key={id}>
                  <div className='poppins-500-14'>{name}</div>  
                  {createdOn && 
                    <div className='poppins-500-11 flex items-center gap-1'>
                      <ClockCircleOutlined />
                      <div>
                        {dayjs.utc(createdOn).local().format('hh:mm A')}
                      </div>

                    </div>}
                  <div className='mt-2'>{renderSets(reps,weight,sets, isConsistent)}</div>
                  <Dropdown 
                    menu={menuProps} 
                    placement="bottomRight" 
                    trigger='click'
                    overlayClassName='custom-dropdown-overlay'
                    onOpenChange={(open) => open && setDeleteModal({...deleteModal, data: {id}})}
                  >
                    <div>
                      <ThreeDots className='absolute top-2 right-2 cursor-pointer' width={25} />
                    </div>
                  </Dropdown>
                </div>)}
            </div>
            <Modal
              title="Delete Exercise Log"
              centered
              open={deleteModal.show}
              onOk={() => {
                console.log(deleteModal.data)
                handleDeleteLog(deleteModal.data)
              }}
              onCancel={() => setDeleteModal({show: false})}
            >
              Are you sure to delete this log?
            </Modal>
        </div>
        
    )
}

export default Home