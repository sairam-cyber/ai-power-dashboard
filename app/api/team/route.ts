import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock team data
let teamMembers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@aipower.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    joinedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@aipower.com',
    role: 'Viewer',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    joinedAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah@aipower.com',
    role: 'Admin',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    joinedAt: '2024-02-10'
  }
];

function getUserFromSession(sessionToken: string) {
  const userId = sessionToken.split('_')[1];
  return teamMembers.find(u => u.id === userId);
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ success: true, members: teamMembers });

  } catch (error) {
    console.error('Get team error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { email, role } = await request.json();

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 });
    }

    // Check if member already exists
    const existingMember = teamMembers.find(m => m.email === email);
    if (existingMember) {
      return NextResponse.json({ error: 'Member already exists' }, { status: 409 });
    }

    // Create new team member
    const newMember = {
      id: (teamMembers.length + 1).toString(),
      name: email.split('@')[0], // Extract name from email
      email,
      role,
      status: 'Pending',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      joinedAt: new Date().toISOString().split('T')[0]
    };

    teamMembers.push(newMember);

    return NextResponse.json({ success: true, member: newMember });

  } catch (error) {
    console.error('Invite team member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
