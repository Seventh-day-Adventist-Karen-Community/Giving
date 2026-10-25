'use server'
import 'server-only'
 
import { cookies } from 'next/headers'
// import { decrypt } from '@/app/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import FetchMe from '@data/me'
import { VerifyToken } from '@data/auth_mutation'
 
export const verifySession = cache(async () => {
    const token = (await cookies()).get('session')?.value
    // const session = await decrypt(cookie)
    if (!token) {
        redirect('/auth/login')
        }
    if (typeof token !== 'string') {
        throw new Error('Invalid session token');
    }
    const verified = await VerifyToken(token);
    return { isAuth: verified }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
 
  try {
    const data = await FetchMe()
    const user = data
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
})
