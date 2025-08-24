import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock billing data
const billingData = {
  subscription: {
    plan: 'Professional',
    status: 'active',
    nextBilling: '2024-09-24',
    amount: 99.00,
    currency: 'USD'
  },
  usage: {
    apiCalls: {
      current: 8750,
      limit: 10000,
      percentage: 87.5
    },
    storage: {
      current: 2.3,
      limit: 5.0,
      unit: 'GB',
      percentage: 46
    },
    teamMembers: {
      current: 3,
      limit: 10,
      percentage: 30
    }
  },
  invoices: [
    {
      id: 'INV-2024-003',
      date: '2024-08-24',
      amount: 99.00,
      status: 'paid',
      downloadUrl: '/api/billing/invoices/INV-2024-003'
    },
    {
      id: 'INV-2024-002',
      date: '2024-07-24',
      amount: 99.00,
      status: 'paid',
      downloadUrl: '/api/billing/invoices/INV-2024-002'
    },
    {
      id: 'INV-2024-001',
      date: '2024-06-24',
      amount: 99.00,
      status: 'paid',
      downloadUrl: '/api/billing/invoices/INV-2024-001'
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ success: true, data: billingData });

  } catch (error) {
    console.error('Get billing data error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
