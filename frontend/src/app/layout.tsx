
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Next.js + NestJS Mini Blog',
    description: 'MVP showing rendering strategies',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <header>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Mini Blog</div>
                    <nav>
                        <Link href="/">Home</Link>
                        <Link href="/posts">Posts</Link>
                        <Link href="/admin">Admin</Link>
                    </nav>
                </header>
                <main>{children}</main>
            </body>
        </html>
    );
}
