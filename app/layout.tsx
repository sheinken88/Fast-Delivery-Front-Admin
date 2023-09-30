import '../src/styles/globals.css'
import { ReduxProvider } from 'store/Provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Fast Delivery Admin',
    description: 'Fast Delivery App for Administrators',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const logo =
        'https://res.cloudinary.com/db3pcwsrm/image/upload/v1696036777/fast-delivery/assets/Logo_small.svg'
    return (
        <>
            <Head>
                <link rel="icon" href={logo} sizes="any" />
            </Head>
            <html lang="en">
                <body className={inter.className}>
                    <ReduxProvider>{children}</ReduxProvider>
                </body>
            </html>
        </>
    )
}
