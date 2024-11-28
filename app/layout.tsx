import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

export const metadata: Metadata = {
  title: "Resume - Cody Maness",
  description: "Resume website for Cody Maness, a Web and Mobile Software Developer with a passion for building accessible, elegant, and robust digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>

      <body>
        <ThemeProvider theme={theme}>
          { children }
        </ThemeProvider>
      </body>
    </html>
  );
}
