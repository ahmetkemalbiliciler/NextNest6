
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Mini Blog</h1>
            <p>This is a presentation MVP demonstrating Next.js rendering strategies connected to a NestJS backend.</p>

            <div className="card" style={{ marginTop: '2rem' }}>
                <h2>Rendering Strategies Demonstrated:</h2>
                <ul>
                    <li><strong>Home Page (This page):</strong> Static Generation (SSG). Prerendered at build time.</li>
                    <li><strong>Post List:</strong> Static Generation (SSG/ISR). Fetched from backend at build time.</li>
                    <li><strong>Post Detail:</strong> Server-Side Rendering (SSR). Fetched on every request.</li>
                    <li><strong>Admin Panel:</strong> Client-Side Rendering (CSR). Interacts with API from browser.</li>
                </ul>
            </div>

            <Link href="/posts" className="btn">View Posts</Link>
        </div>
    );
}
