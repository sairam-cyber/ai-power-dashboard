import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user database - in production, use a real database
let users = [
  {
    id: '1',
    email: 'admin@aipower.com',
    password: 'admin123',
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
    const { email, password, name, confirmPassword } = await request.json();

    // Validate input
    if (!email || !password || !name || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password, // In production, hash the password
      name,
      role: 'User',
      avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face`
    };

    users.push(newUser);

    // Create session token
    const sessionToken = `session_${newUser.id}_${Date.now()}`;
    
    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token: sessionToken
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
