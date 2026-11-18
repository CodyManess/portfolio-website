import type { Project, ProjectRoleLink } from '@/types/project'
import type { Role, RoleProjectLink } from '@/types/role'

export interface RoleProjectRelation {
  roleId: string
  projectIds: readonly string[]
}

/**
 * Single source of truth mapping primary experience roles to the projects
 * worked on during each role.
 */
export const roleProjectRelations: readonly RoleProjectRelation[] = [
  {
    roleId: 'cigna-software-engineering-advisor',
    projectIds: [
      'digital-platform-library',
      'leaf-design-system',
      'mycigna-web-portal',
      'mycigna-mobile-app',
    ],
  },
  {
    roleId: 'cigna-tecdp-lead-advisor',
    projectIds: ['mycigna-mobile-app', 'evernorth-mobile-app'],
  },
  {
    roleId: 'cigna-tecdp-senior-advisor',
    projectIds: [
      'mycigna-web-portal',
      'mycigna-mobile-app',
      'evernorth-mobile-app',
      'tecdportal',
    ],
  },
  {
    roleId: 'mtsu-android-student-developer',
    projectIds: ['mtsu-mobile-app'],
  },
  {
    roleId: 'express-scripts-front-end-intern',
    projectIds: ['mtf-portal'],
  },
]

function indexById<T extends { id?: string }>(
  items: readonly T[]
): Map<string, T> {
  const byId = new Map<string, T>()
  for (const item of items) {
    if (item.id) {
      byId.set(item.id, item)
    }
  }
  return byId
}

/**
 * Attaches `relatedProjects` metadata to each role using `roleProjectRelations`.
 */
export function enrichRolesWithProjects(
  sourceRoles: readonly Role[],
  sourceProjects: readonly Project[]
): Role[] {
  const projectById = indexById(sourceProjects)

  const projectIdsByRole = new Map<string, readonly string[]>()
  for (const relation of roleProjectRelations) {
    projectIdsByRole.set(relation.roleId, relation.projectIds)
  }

  return sourceRoles.map((role) => {
    if (!role.id) return role
    const projectIds = projectIdsByRole.get(role.id)
    if (!projectIds || projectIds.length === 0) return role

    const relatedProjects: RoleProjectLink[] = []
    for (const projectId of projectIds) {
      const project = projectById.get(projectId)
      if (project) {
        relatedProjects.push({
          id: projectId,
          title: project.title,
        })
      }
    }

    return relatedProjects.length > 0 ? { ...role, relatedProjects } : role
  })
}

/**
 * Attaches `relatedRoles` metadata to each project using `roleProjectRelations`.
 */
export function enrichProjectsWithRoles(
  sourceProjects: readonly Project[],
  sourceRoles: readonly Role[]
): Project[] {
  const roleById = indexById(sourceRoles)

  const roleIdsByProject = new Map<string, string[]>()
  for (const relation of roleProjectRelations) {
    for (const projectId of relation.projectIds) {
      const existing = roleIdsByProject.get(projectId)
      if (existing) {
        existing.push(relation.roleId)
      } else {
        roleIdsByProject.set(projectId, [relation.roleId])
      }
    }
  }

  return sourceProjects.map((project) => {
    if (!project.id) return project
    const roleIds = roleIdsByProject.get(project.id)
    if (!roleIds || roleIds.length === 0) return project

    const relatedRoles: ProjectRoleLink[] = []
    for (const roleId of roleIds) {
      const role = roleById.get(roleId)
      if (role) {
        relatedRoles.push({
          id: roleId,
          title: role.title,
          companyName: role.companyName,
          date: role.date,
        })
      }
    }

    return relatedRoles.length > 0 ? { ...project, relatedRoles } : project
  })
}
