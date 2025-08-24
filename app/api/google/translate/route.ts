import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = 'AIzaSyBW0LW4hmHjEp2a0_Eg0StV1Gh5QhHgDXY';

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage = 'en', sourceLanguage = 'auto' } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for translation' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          source: sourceLanguage,
          format: 'text'
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      translation: data.data.translations[0].translatedText,
      detectedSourceLanguage: data.data.translations[0].detectedSourceLanguage,
      originalText: text,
      targetLanguage
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}
