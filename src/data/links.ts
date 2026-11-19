import {
  FaHouse,
  FaSchool,
  FaSuitcase,
  FaInfo,
  FaDiagramProject,
} from 'react-icons/fa6'

export const socialLinks = {
  GitHub: 'https://github.com/CodyManess',
  Email: 'mailto:cody.maness@outlook.com',
  LinkedIn: 'https://www.linkedin.com/in/cody-maness/',
}

export const navLinks = [
  {
    id: 'home',
    title: 'Home',
    href: '/#home',
    icon: FaHouse,
  },
  {
    id: 'about',
    title: 'About',
    href: '/#about',
    icon: FaInfo,
  },
  {
    id: 'experience',
    title: 'Experience',
    href: '/#experience',
    icon: FaSuitcase,
  },
  {
    id: 'credentials',
    title: 'Credentials',
    href: '/#credentials',
    icon: FaSchool,
  },
  {
    id: 'projects',
    title: 'Projects',
    href: '/#projects',
    icon: FaDiagramProject,
  },
] as const

export type NavSectionId = (typeof navLinks)[number]['id']
