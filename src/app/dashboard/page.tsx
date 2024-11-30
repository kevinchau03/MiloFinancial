import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="w-screen">
      <h1>Welcome Kevin</h1>
      <p>Here are your current financials:</p>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>How much are you spending?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$1300</p>
        </CardContent>
        <CardFooter>
          <p>+21 % from last month.</p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
          <CardDescription>How much are you making?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$2000</p>
        </CardContent>
        <CardFooter>
          <p>-50% from last month.</p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget Goal</CardTitle>
          <CardDescription>Japan Trip</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$10000</p>
        </CardContent>
        <CardFooter>
          <p>50% to goal.</p>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Remaining Budget</CardTitle>
          <CardDescription>Japan Trip</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$5000</p>
        </CardContent>
        <CardFooter>
          <p>+10% from last month</p>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
}
