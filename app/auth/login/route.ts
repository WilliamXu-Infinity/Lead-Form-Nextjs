import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();
    
    const res = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = await res.json();
    const response = NextResponse.json(user);
    
    response.cookies.set('token', user.token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return response;
}
