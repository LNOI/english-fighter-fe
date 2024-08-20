export const dynamic = 'force-dynamic'
import { cookies } from 'next/headers'
 
export async function GET(request: Request) {
    // const res = await request.json()
    const cookieStore = cookies()
    const token = cookieStore.get("authjs.session-token")
    console.log(token)
    const product = {
        id : 123,
        name : "Fruit",
    }
    return Response.json({ product })
  }