import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

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
    </html>
  );
}
