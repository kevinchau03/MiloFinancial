"use client"
import React, { useState } from 'react';
import Textbox from '@/components/textbox';

export default function page(){

    // Fields that hold input from the fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div>
            <div className='flex flex-col mx-4 text-center'>
            <h1 className="text-6xl font-extrabold my-6">Worth?</h1>
            <div className="flex flex-col mb-4">
                <Textbox input_function={setEmail} placeholder_text={"Email"}/>
                <Textbox input_function={setPassword} placeholder_text={"Password"}/>
            </div>
            <button className="p-4 border-2 border-solid border-white rounded-md hover:bg-[#3b3b3b]">
                Login
            </button>
        </div>
        </div>
    );
}