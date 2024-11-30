import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import AppChart from '@/components/app-chart'


export default function Dashboard() {
  return (
    <div className="w-screen flex flex-col gap-2">
      <h1 className="text-center">Your Dashboard</h1>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>How much are you spending?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$1300</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
            <CardDescription>How much are you making?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$2000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget Goal</CardTitle>
            <CardDescription>Japan Trip</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$10000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Remaining Budget</CardTitle>
            <CardDescription>Japan Trip</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$5000</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <AppChart />
      </div>
      <Button variant="secondary" size="lg">Talk To Assistant</Button>
    </div>
  );
}
