import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const token = request.headers.get('cookie')?.split('token=')[1];

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Authenticated' });
}
