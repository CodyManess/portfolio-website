import { NextResponse } from 'next/server'
import projects from '@/data/projects'
import { roles } from '@/data/experience'
import { enrichProjectsWithRoles } from '@/data/cross-links'

// The response only depends on local static data, so cache it at build time
// instead of executing the handler on every request (GET handlers are dynamic
// by default).
export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(enrichProjectsWithRoles(projects, roles))
}
