// import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/SessionProvider"
import { NavigationLoadingProvider } from "@/components/navigation-loading-provider"
import LocalAuthInitializer from "@/components/LocalAuthInitializer"

// const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "HappyCricket.com",
  description: "Get live cricket scores, match details, and tournament standings",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Chat script - separate and simple implementation to avoid hydration issues */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              setTimeout(function() {
                var script = document.createElement('script');
                script.src = '/simple-chat.js';
                document.body.appendChild(script);
              }, 1000);
            });
          `
        }} />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <SessionProvider>
          <LocalAuthInitializer />
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            <NavigationLoadingProvider>
              <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/70">
                <Navbar />
                <main className="flex-1 relative">
                  {/* Decorative circle elements */}
                  <div className="hidden lg:block absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="hidden lg:block absolute -bottom-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                  
                  {/* Add transition wrapper for smooth page transitions */}
                  <div className="animate-fade-in opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
                    {children}
                  </div>
                </main>
                {/* Footer removed from layout */}
              </div>
            </NavigationLoadingProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

