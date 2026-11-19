import type { Skill, SkillGroup } from '@/types/about'
import type { Tool } from '@/types/project'

const Tools = {
  React: {
    title: 'React',
    iconName: 'SiReact',
    iconColor: '#61DBFB',
  },
  ReactNative: {
    title: 'React Native',
    iconName: 'SiReact',
    iconColor: '#61DAFB',
  },
  TypeScript: {
    title: 'TypeScript',
    iconName: 'SiTypescript',
    iconColor: '#3178C6',
  },
  Swift: {
    title: 'Swift',
    iconName: 'SiSwift',
    iconColor: '#FFAC45',
  },
  Java: {
    title: 'Java',
    iconName: 'FaJava',
    iconColor: '#007396',
  },
  SpringBoot: {
    title: 'Spring Boot',
    iconName: 'SiSpringboot',
    iconColor: '#6DB33F',
  },
  MySQL: {
    title: 'MySQL',
    iconName: 'SiMysql',
    iconColor: '#4479A1',
  },
  Angular: {
    title: 'Angular',
    iconName: 'SiAngular',
    iconColor: '#ff0000',
  },
  Kotlin: {
    title: 'Kotlin',
    iconName: 'SiKotlin',
    iconColor: '#0095D5',
  },
  Firebase: {
    title: 'Firebase',
    iconName: 'SiFirebase',
    iconColor: '#FF9100',
  },
  PHP: {
    title: 'PHP',
    iconName: 'SiPhp',
    iconColor: '#474a8a',
  },
} satisfies Record<string, Tool>

const skill = (label: string): Skill => ({ label })

const toolSkill = (tool: Tool, label = tool.title): Skill => ({
  label,
  tool,
})

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend & Mobile',
    skills: [
      toolSkill(Tools.React),
      skill('Next.js'),
      toolSkill(Tools.ReactNative),
      toolSkill(Tools.TypeScript),
      skill('JavaScript'),
      toolSkill(Tools.Angular),
      skill('Tailwind CSS'),
      skill('HTML & CSS'),
      toolSkill(Tools.Swift, 'Swift / SwiftUI'),
      toolSkill(Tools.Kotlin, 'Kotlin / Jetpack Compose'),
      skill('Flutter'),
    ],
  },
  {
    category: 'Backend, Cloud & Data',
    skills: [
      skill('Node.js'),
      toolSkill(Tools.Java),
      toolSkill(Tools.SpringBoot),
      toolSkill(Tools.PHP),
      skill('Ruby'),
      toolSkill(Tools.MySQL, 'SQL / MySQL'),
      skill('AWS'),
      skill('Google Cloud'),
      toolSkill(Tools.Firebase),
    ],
  },
  {
    category: 'Testing & Dev Tooling',
    skills: [
      skill('Jest'),
      skill('React Testing Library'),
      skill('Storybook'),
      skill('Git / GitHub / GitLab'),
      skill('GitLab CI/CD'),
      skill('Cursor'),
      skill('GitHub Copilot'),
      skill('Bruno'),
    ],
  },
  {
    category: 'Practices & Collaboration',
    skills: [
      skill('Accessibility (W3C WCAG)'),
      skill('Agile & Scrum'),
      skill('Jira'),
      skill('Confluence'),
    ],
  },
]

export default Tools
