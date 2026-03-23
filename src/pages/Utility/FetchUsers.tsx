"use client";  //added so this runs on the server

import { useState, useEffect } from "react";

const Users2 = () => {
    const [status, setStatus] = useState({
        users: [],
        loading: true,
        error: null,
    });

    async function fetchUsers() {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await res.json();
            setStatus((prevStatus) => ({
                ...prevStatus,
                users: data,
                loading: false,
            }));
        } catch (err: any) {
            setStatus((prevStatus) => ({
                ...prevStatus,
                error: err.message,
                loading: false,
            }));
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (status.loading) {
        return <p>Loading Users...</p>;
    }
    if (status.error) {
        return <p>Error getting users: {status.error}</p>;
    }

    return (
        <>
            <h1 className="text-4xl text-center mt-6">Users</h1>
            <ul className="text-center mt-3">
                {status.users.map((user:any) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Users2;