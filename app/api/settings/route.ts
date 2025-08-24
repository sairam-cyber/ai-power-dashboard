import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock settings data
let userSettings = {
  '1': {
    profile: {
      displayName: 'Admin User',
      email: 'admin@aipower.com',
      timezone: 'UTC-5',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      securityAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '24h',
      loginAlerts: true
    },
    appearance: {
      theme: 'dark',
      compactMode: false,
      animations: true
    },
    api: {
      apiKey: 'sk-1234567890abcdef',
      rateLimit: '1000',
      webhookUrl: ''
    }
  },
  '2': {
    profile: {
      displayName: 'John Doe',
      email: 'user@aipower.com',
      timezone: 'UTC-8',
      language: 'en'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: false,
      securityAlerts: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: '12h',
      loginAlerts: true
    },
    appearance: {
      theme: 'dark',
      compactMode: true,
      animations: false
    },
    api: {
      apiKey: 'sk-0987654321fedcba',
      rateLimit: '500',
      webhookUrl: 'https://example.com/webhook'
    }
  }
};

function getUserFromSession(sessionToken: string) {
  const userId = sessionToken.split('_')[1];
  return userId;
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = getUserFromSession(session.value);
    const settings = userSettings[userId as keyof typeof userSettings];

    if (!settings) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, settings });

  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = getUserFromSession(session.value);
    const newSettings = await request.json();

    if (!userSettings[userId as keyof typeof userSettings]) {
      return NextResponse.json({ error: 'User settings not found' }, { status: 404 });
    }

    // Update settings
    userSettings[userId as keyof typeof userSettings] = {
      ...userSettings[userId as keyof typeof userSettings],
      ...newSettings
    };

    return NextResponse.json({ 
      success: true, 
      settings: userSettings[userId as keyof typeof userSettings] 
    });

  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
