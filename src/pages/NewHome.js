import React from 'react'
import CustomExerciseStrip from '../common/CustomExerciseStrip'
import CustomNavbar from '../common/CustomNavbar'
import HomeCurve from '../svg/HomeCurve'

const NewHome = () => {




    return (
        <div className='bg-white h-screen'>

            {/* Date Component */}
            <div className='flex bg-dark-blue text-white py-4'>
                <div className='relative'>
                    <div className='-rotate-90 absolute top-6 poppins-700-18 left[-7px]'>NOV</div>
                    <div className='flex items-center gap-1 ml-8 overflow-x-auto overflow-y-hidden px-3' style={{width: 'calc(100vw - 32px)'}}>
                        {Array.from(Array(7).keys())
                            .map((date, index) => 
                                <div key={index} className={`border border-white  flex-center flex-col leading-[15px]
                                                    ${index === 3 ? 'rounded-[28px] bg-white text-dark-blue w-17 h-17 min-w-[68px] min-h-[68px]' 
                                                                        : 'rounded-full w-14 h-14 min-w-[56px] min-h-[56px]'}`}>
                                    <div className='poppins-700-11'>10</div>
                                    <div className='poppins-700-12'>MON</div>
                                </div> 
                        )}
                    </div>
                </div>
            </div>

            <div className='relative'>
                <HomeCurve className='absolute top-[-1px]' />
            </div>

            <div className='mt-16 mx-4'>
                
                <div className='leading-6'>
                    <div className='poppins-500-16 text-light-gray'>TODAY’S WORKOUT</div>
                    <div className='poppins-800-32 leading-7 text-dark-blue '>CHEST AND TRICEPS</div>
                </div>


                <div className='mt-12 flex flex-col gap-[14px]'>
                    <CustomExerciseStrip />
                    <CustomExerciseStrip />
                    <CustomExerciseStrip />

                </div>

                <CustomNavbar />


            </div>

 


        </div>
    )
}

export default NewHome