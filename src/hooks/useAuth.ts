import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const useAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await Auth.currentAuthenticatedUser();
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
        return await Auth.signIn(username, password);
    };

    const signOut = async () => {
        await Auth.signOut();
        setUser(null);
    };

    return { user, loading, signIn, signOut };
};

export default useAuth;