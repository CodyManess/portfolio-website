import { Cert, IconType } from '@/shared/models/education'

export const certs: Cert[] = [
  {
    icon: '/credentials/aws-developer-badge.png',
    iconType: IconType.Badge,
    name: 'AWS Certified Developer - Associate Badge',
    org: 'Amazon Web Services',
  },
  {
    icon: '/credentials/deep-learning-logo.png',
    iconType: IconType.Logo,
    name: 'Gen AI for Software Development',
    org: 'DeepLearning.ai',
  },
]
