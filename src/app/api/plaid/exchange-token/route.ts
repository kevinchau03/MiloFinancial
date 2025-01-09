import { NextRequest, NextResponse } from 'next/server'; 
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';

const client = new PlaidApi(config);
export async function POST(req: NextRequest) {
  const { public_token } = await req.json();
  try {
    const response = await client.itemPublicTokenExchange({ public_token });
    const { access_token } = response.data;
    return NextResponse.json({ access_token });
  } catch (error) {
    return NextResponse.json({ error: 'Error exchanging public token' }, { status: 500 });
  }
}