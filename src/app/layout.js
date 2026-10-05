import localFont from "next/font/local";
import "./globals.css";
import { ViewTransition } from "next-view-transitions";

import Nav from "./components/Nav";
import { ViewTransitions } from "next-view-transitions";

const regrade = localFont({
  src: [
    {
      path: "./fonts/NeueRegrade-Variable.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "./fonts/NeueRegrade-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/NeueRegrade-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-regrade-src",
  display: "swap",
});

export const metadata = {
  title: "Anaheim Studio",
  description: "Landing de Anaheim Studio",
};

export default function RootLayout({ children }) {
  return (

    <ViewTransitions>
    <html lang="es" className={regrade.variable}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
    </ViewTransitions>
  );
}