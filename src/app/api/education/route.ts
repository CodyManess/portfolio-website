import { NextResponse } from 'next/server'
import { degrees } from '@/data/education-degrees'
import { certs } from '@/data/education-certs'

export async function GET() {
  return NextResponse.json({
    certs,
    degrees,
  })
}
