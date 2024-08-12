import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBanner } from '../redux/bannerSlice';
import { useParams } from "react-router-dom";
import Timer from './Timer';

const Banner = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const bannerDetails = useSelector((state) => state.banner.bannerDetails);
    const status = useSelector((state) => state.banner.status);
    const error = useSelector((state) => state.banner.error);
    const [bannerToggle, setBannerToggle] = useState(true);
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    useEffect(() => {
        if (id) {
            dispatch(getBanner(id)).then((response) => {
                const currentTime = new Date();
                const bannerTime = new Date(response.payload.timer);
                // Check if the current time is before the banner's timer
                if (currentTime >= bannerTime) {
                    setIsBannerVisible(false);
                } else {
                    setIsBannerVisible(true);
                }
            });
        }
    }, [id, dispatch]);

    const handleToggle = () => {
        setBannerToggle(!bannerToggle);
    };

    return (
        <div className='flex justify-center items-center flex-col'>
            {status === 'loading' && <p>Loading....</p>}
            {status === 'succeeded' && bannerToggle && isBannerVisible &&
                <div className='bannerDetails flex justify-center items-center flex-col mb-5 max-w-[600px] px-6'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <h1 className='text-6xl font-extrabold'>{bannerDetails.title}</h1>
                        <p>{bannerDetails.description}</p>
                    </div>
                    <div>
                        <Timer timer={bannerDetails.timer}  isBannerVisible={isBannerVisible} setIsBannerVisible={setIsBannerVisible}/>
                    </div>
                    <a target='_blank' href={bannerDetails.url} className='mx-auto bg-violet-700 rounded-3xl p-3 cursor-pointer text-white'>
                        Click Here
                    </a>
                </div>
            }
            {status === 'failed' && <p>{error}</p>}
            <button onClick={handleToggle} >
                {bannerToggle ? "Hide banner" : "Show banner"}
            </button>
        </div>
    );
};

export default Banner;
