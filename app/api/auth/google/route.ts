import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const GOOGLE_API_KEY = 'AIzaSyBW0LW4hmHjEp2a0_Eg0StV1Gh5QhHgDXY';

export async function POST(request: NextRequest) {
  try {
    const { idToken, userData } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'Google ID token is required' },
        { status: 400 }
      );
    }

    let googleUser;

    // If userData is provided (demo mode), use it directly
    if (userData) {
      googleUser = userData;
    } else {
      // Verify Google ID token with Google API
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}&key=${GOOGLE_API_KEY}`
      );

      if (!response.ok) {
        return NextResponse.json(
          { error: 'Invalid Google token' },
          { status: 401 }
        );
      }

      googleUser = await response.json();

      // Verify token is valid and not expired
      if (!googleUser.email || !googleUser.email_verified) {
        return NextResponse.json(
          { error: 'Google authentication failed' },
          { status: 401 }
        );
      }
    }

    // Create user object from Google data
    const user = {
      id: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name || googleUser.email.split('@')[0],
      role: 'User',
      avatar: googleUser.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(googleUser.name || 'User')}&background=667eea&color=fff`
    };

    // Create session token
    const sessionToken = `google_session_${user.id}_${Date.now()}`;
    
    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    console.log('Google OAuth session created for:', user.email);

    return NextResponse.json({
      success: true,
      user,
      token: sessionToken
    });

  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.json(
      { error: 'Google authentication failed' },
      { status: 500 }
    );
  }
}
