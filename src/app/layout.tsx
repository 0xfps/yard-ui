import App from "./app";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <App>
        {children}
      </App>
    </>
  );
}
