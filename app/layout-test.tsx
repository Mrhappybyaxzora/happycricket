export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <script src="/chat-loader.js" defer></script>
      </head>
      <body>
        <div>
          {children}
        </div>
        <div id="chat-button-container"></div>
      </body>
    </html>
  )
} 