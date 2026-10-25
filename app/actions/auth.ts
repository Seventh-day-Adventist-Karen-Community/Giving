
import { createSession } from '@app/lib/session'
import { deleteSession } from '@app/lib/session'
import { redirect } from 'next/navigation'
 
export async function login(auth: {username:string, password:string}, next?:string) {
 
  const response = await createSession(auth.username, auth.password)
  if (!response.success)
    return response.errors
  if( next)
      redirect(next)
  redirect('/')
  // Call the provider or db to create a user...
}


export async function logout() {
  deleteSession()
  redirect('/auth/login')
}
