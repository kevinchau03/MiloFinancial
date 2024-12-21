import { NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// Initialize the Plaid client using environment variables
const configuration = new Configuration({
  basePath: PlaidEnvironments.production, // Use sandbox for testing
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
      "PLAID-SECRET": process.env.PLAID_SECRET!,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(req: Request) {
  try {
    // Parse the request body if needed
    const body = await req.json();

    // Generate a unique `client_user_id` (e.g., user ID from your database)
    const clientUserId = body.userId || "user-id";

    // Prepare the Link Token request
    const request = {
      user: {
        client_user_id: clientUserId, // Required: Unique user identifier
      },
      client_name: "Personal Finance App",
      products: ["transactions"], // Specify the Plaid products
      country_codes: ["US"],
      language: "en",
      webhook: "https://sample-web-hook.com", // Optional: Webhook for transaction updates
      redirect_uri: "https://domainname.com/oauth-page.html", // Optional: For OAuth
      account_filters: {
        depository: {
          account_subtypes: ["checking", "savings"],
        },
        credit: {
          account_subtypes: ["credit card"],
        },
      },
    };

    // Call Plaid's linkTokenCreate method
    const response = await plaidClient.linkTokenCreate(request);

    // Return the Link Token to the client
    return NextResponse.json({ linkToken: response.data.link_token });
  } catch (error: any) {
    console.error("Error creating Plaid link token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
