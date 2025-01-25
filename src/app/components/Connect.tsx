"use client";

import { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

interface ConnectProps {
  userId: string;
  onSuccessCallback?: (accessToken: string) => void;
}

const Connect: React.FC<ConnectProps> = ({ userId, onSuccessCallback }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  // Fetch the link token when the component mounts
  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid/create-link-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_user_id: userId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate link token");
        }

        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error("Error generating link token:", error);
      }
    };

    createLinkToken();
  }, [userId]);

  // Handle successful link and exchange public token for access token
  const onSuccess = async (public_token: string) => {
    try {
      const response = await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_token,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to exchange public token");
      }

      const data = await response.json();
      console.log("Access Token:", data.access_token);

      // Call the onSuccessCallback if provided
      if (onSuccessCallback) {
        onSuccessCallback(data.access_token);
      }
    } catch (error) {
      console.error("Error exchanging public token:", error);
    }
  };

  // Initialize Plaid Link
  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  });

  return (
    <button
      onClick={open}
      disabled={!ready}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
    >
      Connect Bank
    </button>
  );
};

export default Connect;
