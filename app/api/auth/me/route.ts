import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user database
const users = [
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

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    console.log('Session check - cookie value:', session?.value);

    if (!session?.value) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Handle both regular and Google OAuth sessions
    let userId;
    if (session.value.startsWith('google_session_')) {
      userId = session.value.split('_')[2]; // google_session_{userId}_{timestamp}
    } else {
      userId = session.value.split('_')[1]; // session_{userId}_{timestamp}
    }
    
    // For Google OAuth sessions, we need to handle dynamic users
    let user = users.find(u => u.id === userId);
    
    // If not found in static users, try to reconstruct from session for Google users
    if (!user && session.value.startsWith('google_session_')) {
      // For Google OAuth, user data should be stored separately or reconstructed
      // For now, return a generic Google user
      user = {
        id: userId,
        email: 'google-user@example.com',
        password: '', // Google OAuth users don't have passwords
        name: 'Google User',
        role: 'User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=667eea&color=fff'
      };
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
