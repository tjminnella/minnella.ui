import { useState, useEffect } from "react";
import type { JSX } from "react";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const FetchPosts = (): JSX.Element => {
    const [data, setData] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");

                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const posts: Post[] = await res.json();
                setData(posts);
            } catch (err: unknown) {
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!data || data.length === 0) {
        return <p>No posts available.</p>;
    }

    return (
        <ul>
            {data.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

export default FetchPosts;