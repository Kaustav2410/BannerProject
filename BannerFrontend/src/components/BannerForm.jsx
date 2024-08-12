import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { createBanner, getBanner, updateBanner } from '../redux/bannerSlice';

const BannerForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial state setup for banner details
  const [bannerDetails, setBannerDetails] = useState({
    title: '',
    description: '',
    url: '',
    timer: new Date().toISOString().slice(0, 16)
  });

  // State to handle loading, error, and validation error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch existing banner details if `id` is provided
  useEffect(() => {
    if (id) {
      dispatch(getBanner(id))
        .then((response) => {
          if (response.payload) {
            setBannerDetails({
              title: response.payload.title,
              description: response.payload.description,
              url: response.payload.url,
              timer: new Date(response.payload.timer).toISOString().slice(0, 16)
            });
          } else {
            setError("Banner not found.");
          }
        })
        .catch(() => {
          setError("Failed to fetch banner.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'timer') {
      setBannerDetails(prevDetails => ({
        ...prevDetails,
        [name]: new Date(value).toISOString()
      }));
    } else {
      setBannerDetails(prevDetails => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!bannerDetails.title) errors.title = "Title is required.";
    if (!bannerDetails.description) errors.description = "Description is required.";
    if (bannerDetails.description && bannerDetails.description.length>500) errors.description = "Description limit cant be more than 500.";
    if (!bannerDetails.url) errors.url = "URL is required.";
    if (new Date(bannerDetails.timer) <= new Date()) errors.timer = "Timer must be in the future.";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (id) {
        // If ID exists, update the banner
        dispatch(updateBanner({ id, ...bannerDetails }))
          .then(() => navigate(`/${id}`))
          .catch((error) => setError('Error updating banner.'));
      } else {
        // If ID does not exist, create a new banner
        dispatch(createBanner(bannerDetails))
          .then((banner) => {
            if (banner.payload.id) {
              navigate(`/${banner.payload.id}`);
            } else {
                setError('Error creating banner.');
            }
          })
          .catch((error) => {setError('Error creating banner.')});
      }
    } catch (error) {
      setError('Error in banner form submission.');
    }
  };

  const sectionClass = {
    divSection: 'flex justify-center items-end flex-col flex-wrap gap-1',
    divSubSection: 'flex justify-center items-center  flex-wrap gap-3',
    inputSection: 'border-2 border-orange-500 rounded-xl p-1 px-3 '
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='py-10 flex justify-center items-center flex-col gap-6 max-w-[450px] mx-auto'>
      <h1 className='text-4xl'>{id ? 'Edit Banner Details' : 'Enter Banner Details'}</h1>
      <form className="flex justify-center items-start flex-col gap-6 " onSubmit={handleSubmission}>
        <div className={sectionClass.divSection}>
          <div className={sectionClass.divSubSection}>
          <label className='w-20'>Title</label>
          <input
            type="text"
            name="title"
            value={bannerDetails.title}
            placeholder="Enter the title"
            onChange={handleChange}
            className={sectionClass.inputSection}
          />
          </div>
          {validationErrors.title && <p className="text-red-500 text-left">{validationErrors.title}</p>}
        </div>
        <div className={sectionClass.divSection}>
          <div className={sectionClass.divSubSection}>
            <label className='w-20'>Description</label>
            <textarea
                name="description"
                value={bannerDetails.description}
                placeholder="Enter the description"
                onChange={handleChange}
                className={`${sectionClass.inputSection} h-32 w-52 resize-none`}
            />
          </div>
          {validationErrors.description && <p className="text-red-500">{validationErrors.description}</p>}
        </div>
        <div className={sectionClass.divSection}>
          <div className={sectionClass.divSubSection}>
          <label className='w-20'>Link</label>
          <input
            type="text"
            name="url"
            value={bannerDetails.url}
            placeholder="Enter the URL"
            onChange={handleChange}
            className={sectionClass.inputSection}
          />
          </div>
          {validationErrors.url && <p className="text-red-500">{validationErrors.url}</p>}
        </div>
        <div className={sectionClass.divSection}>
          <div className={sectionClass.divSubSection}>
          <label className='w-20'>Timer</label>
          <input
            type="datetime-local"
            name="timer"
            value={new Date(bannerDetails.timer).toISOString().slice(0, 16)}
            onChange={handleChange}
            className={sectionClass.inputSection}
          />
          </div>
          {validationErrors.timer && <p className="text-red-500">{validationErrors.timer}</p>}
        </div>
        <button type="submit" className='mx-auto bg-violet-700 rounded-3xl p-3 cursor-pointer text-white'>
          {id ? 'Update Banner' : 'Create Banner'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default BannerForm;
