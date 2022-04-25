import { useRouter, Router } from "next/router";
import { Navigate } from "react-router-dom";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  user: User;
  isAuthenticated: boolean;
};

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  return <Navigate to='/' />
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api.get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [router])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password });

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      router.push('/dashboard')
    } catch (error) {
      console.log(error)  
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
