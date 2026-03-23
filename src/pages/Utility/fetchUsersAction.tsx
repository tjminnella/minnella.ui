"use client";

// import startTransition from React
import { useActionState, startTransition } from "react";
import { getUsers } from "../../actions/getUsers";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function FetchUsers() {
    const [users, fetchAction, isPending] = useActionState(getUsers, []);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <button
                //wrap fetchAction in startTransition to indicate it's a non-urgent update
                onClick={() => startTransition(() => fetchAction())}
                disabled={isPending}
                className="px-4 py-2 bg-green-500 font-bold cursor-pointer text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            >
                {isPending ? 'Fetching Users...' : 'Fetch Users'}
            </button>

            <ul className="mt-4 space-y-2">
                {users.map((user: User) => (
                    <li key={user.id} className="p-3 bg-gray-100 rounded-lg">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}