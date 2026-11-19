import type { IconType } from 'react-icons'
import {
  SiReact,
  SiSwift,
  SiAngular,
  SiKotlin,
  SiFirebase,
  SiPhp,
  SiTypescript,
  SiSpringboot,
  SiMysql,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'

/**
 * Maps a `Tool.iconName` (see `src/data/tools.ts`) to its react-icons component.
 * Shared by every component that renders technology icons so the mapping only
 * needs to be updated in one place when a new tool is added.
 */
export const toolIconMap = {
  SiReact,
  SiSwift,
  SiAngular,
  SiKotlin,
  SiFirebase,
  SiPhp,
  SiTypescript,
  SiSpringboot,
  SiMysql,
  FaJava,
} satisfies Record<string, IconType>

export type ToolIconName = keyof typeof toolIconMap
