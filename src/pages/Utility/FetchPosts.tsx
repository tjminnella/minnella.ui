import { useState, useEffect } from "react";

interface Post {
    id: number;
    title: string;
    // Add other properties if needed, e.g., body: string;
}

const FetchPosts = () => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");

                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const data: Post[] = await res.json();
                setData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
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
        return <p>{error}</p>;
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