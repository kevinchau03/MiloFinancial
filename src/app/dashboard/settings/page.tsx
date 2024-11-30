'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Settings() {
  const [data, setData] = useState(null);

  // Fetch data
  useEffect(() => {
    axios.get('http://localhost:4000/api/data').then((response) => {
      setData(response.data);
    });
  }, []);

  // Post data
  const handleSave = () => {
    axios
      .post('http://localhost:5000/api/save', { name: 'John Doe' })
      .then((response) => console.log(response.data));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Settings</h1>
      <p>Change your profile settings here.</p>
      <div>
        <label>Username</label>
        <Input placeholder="yuh" />
        <label>Email</label>
        <Input placeholder="lol"/>
        <label>Password</label>
        <Input placeholder="Password" type="password" />
      </div>
      {data && <p>{data.message}</p>}
      <button onClick={handleSave}>Send Data</button>
      <Button variant="default" size="lg">Save Changes</Button>
    </div>
  );
}

