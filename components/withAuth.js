// components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('/api/auth/check');
          const data = await response.json();
          
          if (!data.loggedIn) {
            router.push(`/connexion?redirect=${router.asPath}`);
            return;
          }

          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error:', error);
          router.push(`/connexion?redirect=${router.asPath}`);
        }
      };

      checkAuth();
    }, [router]);

    if (!isAuthenticated) {
      return <div>Chargement...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}