import React from 'react'

const CustomExerciseStrip = ({className}) => {
  return (
    <div className={className}>
        <div className='rounded-20 bg-white h-12 flex items-center border border-[#E0EAF5]'
            // style={{boxShadow: '0px 0px 6px #B0CCDD'}}
        >
            <div className='m-5 poppins-400-16 w-full flex gap-2'>
                <div>Barbell bench press</div>
                <img src='/assets/icons/tick-circle-solid.svg' alt='✅' />
            </div>

            <div className='w-[50px] min-w-[50px] border-l h-full flex-center cursor-pointer'>
                <img src='/assets/icons/info-outline-rounded.svg' alt='ℹ️' />
            </div>
        </div>
    </div>
  )
}

export default CustomExerciseStrip