import React from 'react'

const CustomNavOption = ({title, icon, altIcon}) => 
        <div className='flex-1 flex-center cursor-pointer'>
            <div className='flex flex-col items-center'>
                <div className='w-16 h-8 bg-[#D4E5F5] rounded-20 flex-center'>
                    <img src={icon} alt={altIcon} />
                </div>
                <div className='poppins-500-12 '>{title}</div>
            </div>
        </div>

const CustomNavbar = () => {
  return (
    <div className='absolute bottom-0 left-0 h-20 w-full bg-[#EFF4FA] flex'>
       <CustomNavOption title='Track' icon='/assets/icons/track.svg' altIcon='✏️' />
       <CustomNavOption title='Progress' icon='./assets/icons/progress.svg' altIcon='📊' />
    </div>
  )
}

export default CustomNavbar