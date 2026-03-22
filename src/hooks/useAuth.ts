import { useState, useEffect } from 'react';
import { getCurrentUser, signIn as amplifySignIn, signOut as amplifySignOut } from 'aws-amplify/auth';

const useAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const signIn = async (username: string, password: string) => {
        return await amplifySignIn({ username, password });
    };

    const signOut = async () => {
        await amplifySignOut();
        setUser(null);
    };

    return { user, loading, signIn, signOut };
};

export default useAuth;