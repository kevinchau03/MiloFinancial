"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/button';
import Textbox from '@/components/textbox';

export default function page(){

    // Fields that hold input from the fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className='flex flex-col mx-4 text-center'>
            <h1 className="text-6xl font-extrabold my-6">Worth!?</h1>
            <Textbox placeholder_text={"Username"} input_function={setUsername}/>
            <Textbox placeholder_text={"Email"} input_function={setEmail}/>
            <Textbox placeholder_text={"Password"} input_function={setPassword}/>
            <Button button_text={"Create Account"}/>
        </div>
    );
}