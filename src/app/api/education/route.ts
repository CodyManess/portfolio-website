import { NextResponse } from 'next/server'
import { degrees } from '@/data/education-degrees'
import { certs } from '@/data/education-certs'

// The response only depends on local static data, so cache it at build time
// instead of executing the handler on every request (GET handlers are dynamic
// by default).
export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({
    certs,
    degrees,
  })
}
