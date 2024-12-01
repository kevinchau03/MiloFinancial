"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function CategoryChart() {
  interface User {
    transaction_history: { purchase: string; price: number }[];
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("User data loaded", storedUser);
  }, []);

  if (!user) {
    return <p className="text-center">Loading user data...</p>;
  }

  const transactionHistory = user.transaction_history || [];

  // Handle empty transaction history
  if (transactionHistory.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>No Transactions Found</CardTitle>
          <CardDescription>Add transactions to see your chart here.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Group and sum data by purchase
  const groupedData = transactionHistory.reduce((acc, item) => {
    if (!acc[item.purchase]) {
      acc[item.purchase] = 0;
    }
    acc[item.purchase] += item.price;
    return acc;
  }, {} as Record<string, number>);

  // Predefined color palette
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  // Format grouped data for the chart
  const chartData = Object.entries(groupedData).map(([key, value], index) => ({
    category: key,
    amount: value,
    fill: colors[index % colors.length], // Cycle through predefined colors
  }));

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    ...Object.fromEntries(
      Object.keys(groupedData).map((key, index) => [
        key,
        { label: key, color: colors[index % colors.length] },
      ])
    ),
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-left pb-0">
        <CardTitle>Transaction Breakdown</CardTitle>
        <CardDescription>Organized by category.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
