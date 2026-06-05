import { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string // ⚠️ Demo only - don't store in real app
  createdAt: Date
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

interface UserContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  signup: (userData: Omit<User, 'id' | 'createdAt'>) => { success: boolean; error?: string }
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  getOrderHistory: () => any[]
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nasamat_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to load user from localStorage:', error)
      }
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('nasamat_user', JSON.stringify(user))
    }
  }, [user])

  const signup = (userData: Omit<User, 'id' | 'createdAt'>) => {
    // Check if user already exists
    const allUsers = JSON.parse(localStorage.getItem('nasamat_users') || '[]')
    const userExists = allUsers.some((u: User) => u.email === userData.email)

    if (userExists) {
      return { success: false, error: 'البريد الإلكتروني مسجل بالفعل' }
    }

    // Validate password
    if (userData.password.length < 6) {
      return { success: false, error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }
    }

    // Create new user
    const newUser: User = {
      id: `USER-${Date.now()}`,
      ...userData,
      createdAt: new Date(),
    }

    // Save to users list
    allUsers.push(newUser)
    localStorage.setItem('nasamat_users', JSON.stringify(allUsers))

    // Set as current user
    setUser(newUser)

    return { success: true }
  }

  const login = (email: string, password: string) => {
    const allUsers = JSON.parse(localStorage.getItem('nasamat_users') || '[]')
    const foundUser = allUsers.find((u: User) => u.email === email && u.password === password)

    if (!foundUser) {
      return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }
    }

    setUser(foundUser)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nasamat_user')
  }

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)

    // Update in users list
    const allUsers = JSON.parse(localStorage.getItem('nasamat_users') || '[]')
    const updatedUsers = allUsers.map((u: User) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem('nasamat_users', JSON.stringify(updatedUsers))
  }

  const getOrderHistory = () => {
    if (!user) return []

    const allOrders = JSON.parse(localStorage.getItem('nasamat_orders') || '[]')
    return allOrders.filter((order: any) => order.customer.email === user.email)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        updateProfile,
        getOrderHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
