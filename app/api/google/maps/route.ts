import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = 'AIzaSyBW0LW4hmHjEp2a0_Eg0StV1Gh5QhHgDXY';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const type = searchParams.get('type') || 'geocode'; // geocode, places, directions

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    let apiUrl = '';
    let params = new URLSearchParams({
      key: GOOGLE_API_KEY
    });

    switch (type) {
      case 'geocode':
        apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
        params.append('address', query);
        break;
      
      case 'places':
        apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        params.append('query', query);
        break;
      
      case 'directions':
        const origin = searchParams.get('origin');
        const destination = searchParams.get('destination');
        if (!origin || !destination) {
          return NextResponse.json(
            { error: 'Origin and destination are required for directions' },
            { status: 400 }
          );
        }
        apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';
        params.append('origin', origin);
        params.append('destination', destination);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: geocode, places, or directions' },
          { status: 400 }
        );
    }

    const response = await fetch(`${apiUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Google Maps API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      type,
      query,
      data
    });

  } catch (error) {
    console.error('Google Maps API error:', error);
    return NextResponse.json(
      { error: 'Maps API request failed' },
      { status: 500 }
    );
  }
}
