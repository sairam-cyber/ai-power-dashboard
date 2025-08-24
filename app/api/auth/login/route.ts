import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user database - in production, use a real database
const users = [
  {
    id: '1',
    email: 'admin@aipower.com',
    password: 'admin123', // In production, use hashed passwords
    name: 'Admin User',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'user@aipower.com',
    password: 'user123',
    name: 'John Doe',
    role: 'User',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('Login attempt:', { email, password: '***' });
    console.log('Available users:', users.map(u => ({ email: u.email, password: '***' })));

    // Validate input
    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user with detailed logging
    console.log('Searching for user with email:', email);
    console.log('Email length:', email.length, 'Password length:', password.length);
    
    const user = users.find(u => {
      const emailMatch = u.email.trim().toLowerCase() === email.trim().toLowerCase();
      const passwordMatch = u.password.trim() === password.trim();
      console.log(`User ${u.email}: email match = ${emailMatch}, password match = ${passwordMatch}`);
      return emailMatch && passwordMatch;
    });
    
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('Authentication failed - no matching user');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session token (in production, use JWT or secure session management)
    const sessionToken = `session_${user.id}_${Date.now()}`;
    
    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/' // Ensure cookie is available across all paths
    });

    console.log('Session cookie set:', sessionToken);

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token: sessionToken
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
