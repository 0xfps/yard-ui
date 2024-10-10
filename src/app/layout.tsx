"use client"

import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import useWindowDimensions from "@/hooks/useWindowDimensions";
import AppContainer from "@/components/app-container";
import App from "./app";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { width } = useWindowDimensions()

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=1024" />
        <link rel="icon" href="/images/yard.png" />
      </head>
      <body>
        {
          width != 0 ?
            (width >= 900)
              ? <App>{children}</App>
              : <AppContainer>
                <div className="w-full h-full flex justify-center items-center text-3xl font-sf-bold">
                  Yard is not supported on small screens.
                </div>
              </AppContainer>
            : <></>
        }
      </body>
    </html>
  );
}
