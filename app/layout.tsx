import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import UserStorage from '@/components/UserStorage';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HRIS",
  description: "Video calling app",
  icons: {
    icon: '/icons/nha_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/nha_logo.png',
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#0E78F9',
            colorBackground: '#1c1f3e',
            colorInputBackground: '#252a41',
            colorInputText: '#bbb',
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          <UserStorage/>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
