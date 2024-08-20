import { cookies } from 'next/headers';
import {DataIndicators} from '@/data/indicator'
export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('authjs.session-token');

  try {
    let data = DataIndicators
    return Response.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Failed to fetch strategies' }, { status: 500 });
  }
}