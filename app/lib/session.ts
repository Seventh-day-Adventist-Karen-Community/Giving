'use server'
import 'server-only'
import { cookies } from 'next/headers'
import { LoginUser, PasswordChange } from '@data/auth_mutation'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
 
export async function createSession(username:string, password:string):Promise<{success:boolean, errors:object}> {
//   const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const expiresAt = new Date(Date.now() + 1/2 * 24 * 60 * 60 * 1000)
  const data = await LoginUser(
                      {
                          username: username, 
                          password: password, 
                      })
  if(data.success && data.token){
    const token = data.token
    // const session = await encrypt({ token, expiresAt })
    const cookieStore = await cookies()
    
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
    return{success:data.success, errors:[]}
 }
 else{
    return {success:false,errors: data.errors}
 }
}
 
export async function createPasswordChangeSession(oldpassword:string, password1:string, password2:string):Promise<{success:boolean, errors:object}> {
//   const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const expiresAt = new Date(Date.now() + 1/2 * 24 * 60 * 60 * 1000)
  const data = await PasswordChange(
                      {
                          oldPassword: oldpassword, 
                          newPassword1: password1, 
                          newPassword2: password2, 
                      }) 
  if(data.success && data.token){
    const token = data.token
    // const session = await encrypt({ token, expiresAt })
    const cookieStore = await cookies()
    
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
    return{success:data.success, errors:[]}
 }
 else{
    return {success:false,errors: data.errors}
 }
}



export async function updateSession() {
  const session = (await cookies()).get('session')?.value
//   const payload = await decrypt(session)
 
  if (!session ) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}


export async function getSession(){
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
//   const payload = await decrypt(session)
  if (!session )
    return null
  return session
}
