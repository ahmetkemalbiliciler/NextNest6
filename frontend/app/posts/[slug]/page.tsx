
import { notFound } from 'next/navigation';

type Post = {
    id: number;
    title: string;
    slug: string;
    content: string;
    author: string;
    createdAt: string;
}

async function getPost(slug: string): Promise<Post> {
    // SSR: cache: 'no-store' ensures fetch runs on every request
    // This demonstrates Server-Side Rendering
    const res = await fetch(`http://localhost:3001/posts/${slug}`, {
        cache: 'no-store',
    });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }

    return res.json();
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getPost(params.slug);

    return (
        <div>
            <article className="card">
                <h1>{post.title}</h1>
                <div style={{ color: '#666', marginBottom: '1rem' }}>
                    By <strong>{post.author}</strong> on {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #eee' }} />
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {post.content}
                </div>
            </article>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderRadius: '4px' }}>
                <strong>Rendering Info:</strong> This page is <strong>SSR (Server-Side Rendered)</strong>.
                The content was fetched fresh from the server for this request.
            </div>
        </div>
    );
}
