import "./globals.css";

export const metadata = {
  title: "Mail",
  description: "AI-powered email client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}