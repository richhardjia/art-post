import React, {useState} from 'react';

import {preview} from '../assets';
import { FormField, Loader } from '../components';


const EditImage = () => {
    
    const [form, setForm] = useState({
        name : '',
        prompt : '',
        photo : '',
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);



    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const performEdit = async () => {
        if(form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch(
                    "http://localhost:8080/api/v1/dalle",
                    {
                        headers: { 'Content-Type': 'application/json' },
                        method: "POST",
                        body: JSON.stringify({prompt : form.prompt}),
                    }
                );
                
                const data = await response.json();

                setForm({...form, photo : data.photo})


            } catch (error) {
                alert(error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please enter a prompt');
        }
    }

  return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>Edit</h1>
            <p className='mt-w text-[#666e75] text-[16px] max-w[500px]'>Edit images with AI</p>
        </div>

        {/** Div for uploaded image and edited image */}
        <div className='flex space-between gap-64'>
            {/* Left Image Preview Upload Div */}
            <div className='ml-40 relative mt-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
                <img 
                src={selectedImage ? URL.createObjectURL(selectedImage) : preview}
                alt='upload_preview'
                className='w-9/12 h-9/12 object-contain'/>
            </div>

            {/* Right image preview (where the edited image will go) */}
            <div className='relative mt-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
                {form.photo ? (
                        <img
                            src={form.photo}
                            alt={form.prompt}
                            className='w-full h-full object-contain'
                        />
                    ) : (
                        <img
                            src={preview}
                            alt='preview'
                            className='w-9/12 h-9/12 object-contain'
                        />
                )}

                {generatingImg && (
                    <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                        <Loader/>
                    </div>
                )}
            </div>
        </div>

        {/** Div for uploading the image button */}
        <div className='mt-4 ml-40 text-sm font-medium text-gray-900'>

            <div>Upload Image to edit</div>
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
                }}
            />
        </div>
        
        {/** For typing in the prompt */}
        <form className='mt-10 max-w-3xl'>
            <div>
                <FormField
                    LabelName="Edit Instructions"
                    type='text'
                    name='prompt'
                    placeholder='Make it nightime'
                    value={form.prompt}
                    handleChange={handleChange}
                />
            </div>
        </form>
        
        {/** Perform edit button */}
        <div className='mt-2'>
            <button 
                type='submit'
                onClick = {performEdit}
                className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
            Perform Edit

            </button>
        </div>



    </section>
  )
}

export default EditImage