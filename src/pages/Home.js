import { Divider } from 'antd';
import React from 'react'
import CustomButton from '../common/CustomButton';
import CustomCalendar from '../common/CustomCalendar';
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col items-center'>
            <CustomCalendar />
            <Divider className='m-0 mb-10' />
            <div className='flex flex-col items-center'>
                <div className='poppins-500-12'>No exercise logged</div>
                <CustomButton 
                    className='flex flex-center mt-2' 
                    onClick={() => navigate('/log')}
                >Log session</CustomButton>
            </div>
        </div>
        
    )
}

export default Home