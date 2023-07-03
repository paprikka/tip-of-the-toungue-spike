import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tip of the Tongue",
  description:
    "Has your parahippocampal gyrus activation decreased? We can help!",
  authors: [
    {
      name: "Rafał Pastuszak",
    },
  ],
  twitter: {
    card: "summary_large_image",
    creator: "@rafalpast",
  },
  openGraph: {
    title: "Tip of the Tongue",
    description:
      "Has your parahippocampal gyrus activation decreased? We can help!",
    type: "website",
    url: "https://tip.potato.horse",
    siteName: "Tip of the Tongue",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        async
        defer
        data-website-id="edec0c56-d7c4-4f31-8a1e-72547709184d"
        data-domains="tip.potato.horse"
        src="https://sonnet-events.vercel.app/umami.js"
      ></Script>
    </html>
  );
}
