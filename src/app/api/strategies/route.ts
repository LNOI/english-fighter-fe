import { cookies } from 'next/headers';


export async function POST(request: Request){
  const { pathname } = new URL(request.url)
  const body = await request.json()
  
  // const cookieStore = cookies();
  // const token = cookieStore.get('authjs.session-token');

  try {
  
    const resp = await fetch(process.env.BACKEND_URL+ pathname.replace("/api","") ,
    {
      method:"POST",
      body: JSON.stringify(body)
    })
  
    // //console.log(resp)
    return Response.json({ resp });
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Failed to fetch strategies' }, { status: 500 });
  }
}


export async function GET(request: Request) {
  const path = new URL(request.url)
  // //console.log(path)
  // const id = searchParams.get('id')
  
  // try {
  //   const resp = await fetch(process.env.BACKEND_URL+ pathname.replace("/api","") ,
  //       {
  //         method : "GET"
  //       }
  //     )
  //   //console.log(resp)
  //   return Response.json({ resp });
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   return Response.json({ error: 'Failed to fetch strategies' }, { status: 500 });
  // }
}