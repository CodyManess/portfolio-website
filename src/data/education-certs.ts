import type { Cert } from '@/types/education'
import { IconType } from '@/types/education'
import awsBadge from '@public/credentials/aws-developer-badge.webp'
import deepLearningLogo from '@public/credentials/deep-learning-logo.webp'

export const certs: Cert[] = [
  {
    icon: awsBadge,
    iconType: IconType.Badge,
    name: 'AWS Certified Developer - Associate Badge',
    org: 'Amazon Web Services',
  },
  {
    icon: deepLearningLogo,
    iconType: IconType.Logo,
    name: 'Gen AI for Software Development',
    org: 'DeepLearning.ai',
  },
]
