'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Settings() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Settings</h1>
      <p>Change your profile settings here.</p>
      <div>
        <label>Username</label>
        <Input placeholder={user.name} />
        <label>Email</label>
        <Input placeholder={user.email}/>
        <label>Password</label>
        <Input placeholder="Password" type="password" />
      </div>
      <Button variant="default" size="lg">Save Changes</Button>
    </div>
  );
}

