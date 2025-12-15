
import Link from 'next/link';

type Post = {
    id: number;
    title: string;
    slug: string;
    content: string;
    author: string;
    createdAt: string;
}

async function getPosts(): Promise<Post[]> {
    // ISR: Revalidate every 10 seconds
    // This demonstrates that the page is static but updates periodically
    const res = await fetch('http://localhost:3001/posts', {
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        // In a real app, handle error gracefully
        throw new Error('Failed to fetch posts');
    }

    return res.json();
}

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <div>
            <h1>Blog Posts</h1>
            <p style={{ marginBottom: '2rem' }}>
                This page uses <strong>ISR (Incremental Static Regeneration)</strong>.
                It is pre-rendered but revalidates data every 10 seconds.
            </p>

            {posts.length === 0 ? (
                <p>No posts found. Go to Admin to create one.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="card">
                        <h2>
                            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <small>By {post.author} on {new Date(post.createdAt).toLocaleDateString()}</small>
                    </div>
                ))
            )}
        </div>
    );
}
