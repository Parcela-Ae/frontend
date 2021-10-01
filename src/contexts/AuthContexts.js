import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import Router from "next/router"
import AuthService from "../services/auth.service";


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  let isAuthenticade = !!user

  useEffect(async () => {
    const { 'parcelaAe.token': token } = parseCookies()
    if (token) {
      const userdto = await AuthService.profile()
      setUser(userdto)
      isAuthenticade = true
    }
  }, [])

  async function signIn(data) {

    const { accessToken, ...userdto } = await AuthService.signIn(data)

    if (accessToken) {
      let token = accessToken.split(" ")

      setCookie(undefined, 'parcelaAe.token', token[1], {
        maxAge: 60 * 60 * 1, // 1 hour
      })
      setUser(userdto)
      isAuthenticade = true
      Router.push("/home")
    }

  }

  async function signOut() {
    
    destroyCookie(undefined, 'parcelaAe.token')
    isAuthenticade = false
    window.location.href  = '/'
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticade, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

