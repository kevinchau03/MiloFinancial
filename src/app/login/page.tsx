"use client"
import React, { useState } from 'react';
import Textbox from '@/components/textbox';
import TextboxOpposite from '@/components/textbox_opposite';
import Button from '@/components/button';

export default function page(){

    // Fields that hold input from the fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div>
            <div className='flex flex-col mx-4 text-center'>
                <h1 className="text-6xl font-extrabold my-6">Worth!?</h1>
                <div className="flex flex-col mb-4">
                    <Textbox input_function={setEmail} placeholder_text={"Email"}/>
                    <TextboxOpposite input_function={setPassword} placeholder_text={"Password"}/>
                </div>
                <Button button_text={"Login"}/>
            </div>
        </div>
    );
}