import { NextResponse } from 'next/server'
import { degrees } from '@/shared/data/educationDegrees'
import { certs } from '@/shared/data/educationCerts'

export async function GET() {
  return NextResponse.json({
    certs,
    degrees,
  })
}
