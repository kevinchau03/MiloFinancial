"use client"
import React, { useState } from 'react';
import Link from 'next/link';

export default function page(){

    // Fields that hold input from the fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className='flex flex-col mx-4 text-center'>
            <h1 className="text-4xl text-bold my-6">Signup</h1>
            <input onChange={(e) => setUsername(e.target.value)} className='m-4 p-1 rounded-md' type='text' placeholder='Username'></input>
            <input onChange={(e) => setEmail(e.target.value)} className='m-4 p-1 rounded-md' type='text' placeholder='Email'></input>
            <input onChange={(e) => setPassword(e.target.value)} className='m-4 p-1 rounded-md' type='text' placeholder='Password'></input>
            <Link href='/login' className="p-4 border-2 border-solid border-white rounded-md hover:bg-[#3b3b3b]">
                Create Account
            </Link>
        </div>
    );
}