import useAuth from '../../hooks/useAuth';

const Authenticate = () => {
    const { user, loading, signIn, signOut } = useAuth();

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.username}</h1>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            ) : (
                <button onClick={() => signIn('username', 'password')}>Sign In</button>
            )}
        </div>
    );
};

export default Authenticate;