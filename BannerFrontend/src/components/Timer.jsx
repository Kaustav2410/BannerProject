import React,{useState,useEffect} from 'react'

const Timer = ({timer,isBannerVisible,setIsBannerVisible}) => {
    const [timerDetails,setTimerDetails] =useState({
        seconds: 0,
        minutes: 0,
        hours: 0,
        days:0
    })
    const { seconds, minutes, hours, days } = timerDetails;
    function calTimer(){
        const target = new Date(timer);
        const curr = new Date();
        const totalSeconds = (target - curr) / 1000;

        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const hours = Math.floor((totalSeconds / 3600) % 24);
        const days = Math.floor(totalSeconds / 3600 / 24);
        if(totalSeconds<=0) setIsBannerVisible(false);
        setTimerDetails({ seconds, minutes, hours, days });
    }

    useEffect(() => {
        calTimer(); // Call it initially to set the timer details
        const intervalId = setInterval(() => {
          calTimer();
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, [timer]); // Re-run if timer changes
      const timerClass ={
        ptag:'border-violet-700 rounded-3xl border-2 p-4',
        divtag:'sm:flex flex-col gap-3 justify-center items-center'
      }
  return (
      <div className=' flex justify-center items-center w-screen gap-5 text-7xl py-4'>
        <div className={timerClass.divtag}><p className={timerClass.ptag}>{days}</p><label className='text-sm'>days</label></div>
        <div className={timerClass.divtag}><p className={timerClass.ptag}>{hours}</p><label className='text-sm'>hours</label></div>
        <div className={`${timerClass.divtag} hidden`}><p className={timerClass.ptag}>{minutes}</p><label className='text-sm'>minutes</label></div>
        <div className={timerClass.divtag} ><p className={timerClass.ptag}>{seconds}</p><label className='text-sm'>seconds</label></div>
    </div>
  )
}

export default Timer
