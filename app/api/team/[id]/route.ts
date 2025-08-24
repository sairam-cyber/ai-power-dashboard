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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = params;
    const { role } = await request.json();

    if (!role) {
      return NextResponse.json({ error: 'Role is required' }, { status: 400 });
    }

    const memberIndex = teamMembers.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    teamMembers[memberIndex].role = role;

    return NextResponse.json({ success: true, member: teamMembers[memberIndex] });

  } catch (error) {
    console.error('Update team member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = params;
    
    const memberIndex = teamMembers.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    teamMembers.splice(memberIndex, 1);

    return NextResponse.json({ success: true, message: 'Member removed successfully' });

  } catch (error) {
    console.error('Remove team member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
