import { Session } from '@supabase/supabase-js';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';

// Define the shape of our authentication context data
type AuthData = {
  session: Session | null;     // Current Supabase auth session
  mounting: boolean;           // Loading state while checking auth status
  user: any;                   // User profile data from database
};

// Create React Context with default values
const AuthContext = createContext<AuthData>({
  session: null,      // Default: no session
  mounting: true,     // Default: loading state
  user: null,         // Default: no user data
});

export default function AuthProvider({ children }: PropsWithChildren) {
  // State for Supabase authentication session
  const [session, setSession] = useState<Session | null>(null);
  
  // State for user profile data from our database
  const [user, setUser] = useState/* <{
    avatar_url: string;
    created_at: string | null;
    email: string;
    expo_notification_token: string | null;
    id: string;
    stripe_customer_id: string | null;
    type: string | null;
  } | null> */(null);
  
  // Loading state to track initial auth check
  const [mounting, setMounting] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      // Get current session from Supabase auth
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      // our query
      if (session) {
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('error', error);
        } else {
          setUser(user);
        }
      }
      
      /* if we have session - fetch additional user data from our database */
     
      setMounting(false);  // Initial auth check complete
    };

    fetchSession();  // Check auth status on component mount
    
    // Set up auth state change listener for real-time updates
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);  // Update session on sign in/out
    });
  }, []);  // Empty dependency array = run only on mount

  return (
    // Provide auth data to all child components
    <AuthContext.Provider value={{ session, mounting, user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to easily access auth context
export const useAuth = () => useContext(AuthContext);