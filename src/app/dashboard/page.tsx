"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CategoryChart from "@/components/app-piechart";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [launch, setLaunch] = useState(false);
  const [agentResponse, setAgentResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const userId = user?.username || "Kev";
  const voiceAPI = process.env.NEXT_PUBLIC_VOICEFLOW; // API Key from environment variable
  console.log("Voice API Key:", voiceAPI);

  const launchChat = async () => {
    setLoading(true);
    try {
      console.log("Launching chat...");
      const response = await axios.post(
        `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
        { request: { type: "launch" } },
        {
          headers: {
            'Authorization': voiceAPI,
            'versionID': 'production',
            'accept': 'application/json',
            'content-type': 'application/json'
          }
        }
      );

      const traces = response.data || [];
      console.log("Traces received:", traces);

      setAgentResponse([]); // Clear previous responses

      traces.forEach((trace) => {
        if (trace.type === "text") {
          console.log("Text:", trace.payload.message);
          setAgentResponse((prev) => [...prev, trace.payload.message]);
        }
      });

      setLaunch(true);
    } catch (error) {
      console.error("Error launching chat:", error);
    } finally {
      setLoading(false);
    }
  };

  async function sendQuery(text) {
    console.log("Sending query:", text);
    try {
      const response = await axios.post(
        `https://general-runtime.voiceflow.com/state/user/${userId}/interact`,
        { request: { type: "text", payload: text } },
        {
          headers: {
            'Authorization': voiceAPI,
            'versionID': 'production',
            'accept': 'application/json',
            'content-type': 'application/json'
          }
        }
      );

      const traces = response.data || [];
      console.log("Traces received:", traces);

      setAgentResponse([]); // Clear previous responses

      for (let trace of traces) {
        if (trace.type === "text") {
          console.log("Text:", trace.payload.message);
          setAgentResponse(agentResponse => [...agentResponse, trace.payload.message]);
        }
      }
    } catch (error) {
      console.error("Error sending query:", error);
      setAgentResponse(["An error occurred. Please try again."]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendQuery(query);
  }


  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("User data loaded", storedUser);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (!user) {
    return <p className="text-center">Loading user data...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Welcome {user.username}, to your dashboard</h1>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses:</CardTitle>
            <CardDescription>How much are you spending?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.expenses}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Income:</CardTitle>
            <CardDescription>How much are you making?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.revenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal:</CardTitle>
            <CardDescription>Japan Trip</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.budget}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Balance:</CardTitle>
            <CardDescription>Your Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${user.account_balance}</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <CategoryChart />
      </div>
      <div className="flex gap-4">
        <Button variant="default" size="lg" onClick={handleOpenModal} className="flex-grow">
          Talk To Assistant
        </Button>
        <Link href="/dashboard/budget" className="flex-grow">
          <Button variant="default" size="lg" className="w-full">
            Edit Manually
          </Button>
        </Link>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div
            className="flex flex-col gap-4 bg-card rounded-lg p-4 shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl text-center">Milo, Your Financial Assistant</h1>
            <div>
              {launch &&
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <button type="submit" className="p-2">Send</button>
                </form>
              }
              {agentResponse.length > 0 && (
                <div className="mt-4">
                  {agentResponse.map((response, index) => (
                    <p key={index} className="text-sm">
                      Milo: {response}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {!launch &&
                <Button onClick={launchChat} disabled={loading} variant="default">
                  {loading ? "Loading..." : "Launch Chat"}
                </Button>
              }
          </div>
        </div>
      )}
    </div>
  );
}

