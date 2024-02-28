import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import "./globals.css";


export const metadata: Metadata = {
  title: "mysql test",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  Sentry.init({
    dsn: "https://140828d9085a536b83602894cfe033fe@o4506824585052160.ingest.sentry.io/4506824585248768",
    integrations: [
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });

  return (
    // <ClerkProvider>
    <html lang="en">
      <body >{children}</body>
    </html>
    // </ClerkProvider>
  );
}
