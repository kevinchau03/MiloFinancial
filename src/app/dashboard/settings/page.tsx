'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Settings() {


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Settings</h1>
      <p>Change your profile settings here.</p>
      <div>
        <label>Username</label>
        <Input placeholder="yuh" />
        <label>Email</label>
        <Input placeholder="lol" />
        <label>Password</label>
        <Input placeholder="Password" type="password" />
      </div>
      <Button variant="default" size="lg">Save Changes</Button>
    </div>
  );
}

