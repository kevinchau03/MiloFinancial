"use client"
import React, { useState } from 'react';

export default function page(){

    // Fields that hold input from the fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div>
            <div className='flex flex-col mx-4 text-center'>
            <h1 className="text-4xl text-bold my-6">Worth?</h1>
            <div className="flex flex-col mb-4">
                <input onChange={(e) => setEmail(e.target.value)} className='m-4 p-1 rounded-md' type='text' placeholder='Email'></input>
                <input onChange={(e) => setPassword(e.target.value)} className='m-4 p-1 rounded-md' type='text' placeholder='Password'></input>
            </div>
            <button className="p-4 border-2 border-solid border-white rounded-md hover:bg-[#3b3b3b]">
                Login
            </button>
        </div>
        </div>
    );
}