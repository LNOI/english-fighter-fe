export async function list_strategies(){
    const res = await fetch("http://localhost:3000/api/strategies/", { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
    
    return res.json()
}

export async function list_indicators(){
    const res = await fetch("http://localhost:3000/api/indicators/", { cache: 'no-store' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
    
    return res.json()
}

