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
    description:
      'Validates proficiency in developing, testing, deploying, and debugging cloud-based applications on AWS using core services, serverless architectures, SDKs, and CI/CD workflows.',
    skills: [
      'AWS Lambda & Serverless',
      'API Gateway & DynamoDB',
      'IAM & KMS Security',
      'CI/CD & CodePipeline',
      'CloudWatch Monitoring',
      'AWS SDKs & APIs',
    ],
    programUrl:
      'https://aws.amazon.com/certification/certified-developer-associate/',
  },
  {
    icon: deepLearningLogo,
    iconType: IconType.Logo,
    name: 'Gen AI for Software Development',
    org: 'DeepLearning.ai',
    description:
      'A three-course skill certificate covering practical integration of large language models across the software development lifecycle, including AI-assisted pair programming, automated testing, performance profiling, and system design.',
    skills: [
      'LLM Pair Programming',
      'Prompt Engineering for Devs',
      'AI-Assisted Testing & QA',
      'Code Refactoring & Profiling',
      'AI-Powered System Design',
    ],
    programUrl: 'https://www.deeplearning.ai/courses/',
  },
]
