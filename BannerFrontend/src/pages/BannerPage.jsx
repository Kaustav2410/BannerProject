import React, { useState } from 'react'
import Banner from '../components/Banner'
import BannerForm from '../components/BannerForm'

const BannerPage = () => {
     const [toggleFormEdit,setToggleFormEdit]= useState(false);
     function handleFormEdit(){
        setToggleFormEdit(!toggleFormEdit);
     }
  return (
    <div className="banner-page flex justify-center items-center flex-col min-h-screen bg-yellow-400 w-full overflow-hidden ">
        <Banner/>
        <button onClick={handleFormEdit}>Edit Banner</button>
        {toggleFormEdit &&  <BannerForm/>}
    </div>
  )
}

export default BannerPage
