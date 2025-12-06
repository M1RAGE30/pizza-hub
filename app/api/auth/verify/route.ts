import { verifyVerificationCode } from '@/shared/lib/verification-code';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    await verifyVerificationCode(code);

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.error('[VERIFY_GET] Server error', error);
    return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
  }
}

