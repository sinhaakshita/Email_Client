import "./globals.css";

export const metadata = {
  title: "Luma Mail",
  description: "A modern AI-powered email client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}