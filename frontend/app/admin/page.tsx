
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to create post');
            }

            setStatus('success');
            setFormData({ title: '', content: '', author: '' });
            // Refresh router so that if we navigate to posts, it might see updates (although ISR caches)
            router.refresh();

            // Reset success status after a few seconds
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong');
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <div className="card">
                <p style={{ marginBottom: '1rem' }}>
                    This page is <strong>CSR (Client-Side Rendered)</strong>.
                    Everything here runs in the browser.
                </p>

                {status === 'success' && (
                    <div className="success">Post created successfully!</div>
                )}
                {status === 'error' && (
                    <div className="error">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows={6}
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Creating...' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
}
