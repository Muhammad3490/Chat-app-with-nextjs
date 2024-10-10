import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider/theme-provider'
import { Inter_Tight } from 'next/font/google'
import Navbar from '@/components/Navbar'
const font = Inter_Tight({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}