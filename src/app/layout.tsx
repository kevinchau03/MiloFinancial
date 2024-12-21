import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "Milo Financial Aid",
  description: "A budgetting assistant in your wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className="bg-background">          
          {children}
        </body>
      </Provider>
    </html>
  );
}
