import { supabase } from '@/utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

type ContextProps = {
  user: null;
  session: Session | null;
  isLoading: boolean;
};

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunched, setIsLauched] = useState<boolean | null>(null);

  // const checkUserSession = async () => {
  //   const session = await supabase.auth.getSession();
  //   setSession(session.data.session);
  //   setUser(user);

  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       setSession(session);
  //       setUser(user);
  //     }
  //   );

  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // };

  const checkUserSession = async () => {
    const session = await supabase.auth.getSession();
    setSession(session?.data.session);
    setUser(user);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(user);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  };

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsLauched(true);
      }
      setIsLauched(false);
    });
    checkUserSession();
  }, [user]);

  const value = {
    user,
    session,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
