export type ServiceIconId =
  | 'workflow'
  | 'brain'
  | 'webhook'
  | 'bellRing'
  | 'fileText'
  | 'gauge'
  | 'share2'
  | 'waves'
  | 'barChart3'

export interface ServiceCard {
  title: string
  description: string
  icon: ServiceIconId
  meta?: string[]
}

export interface ServicesSection {
  header: {
    title: string
    description: string
  }
  cards: ServiceCard[]
}

export const servicesSection: ServicesSection = {
  header: {
    title: 'Services',
    description:
      'Comprehensive AI and automation programs built for founders who want leverage, not more busywork.',
  },
  cards: [
    {
      title: 'AI Automation',
      description:
        'Design autonomous workflows across n8n, Zapier, and Make.com so every repetitive task runs itself with AI in the loop.',
      icon: 'workflow',
      meta: ['n8n', 'Zapier', 'Make.com'],
    },
    {
      title: 'CRM & GoHighLevel',
      description:
        'Build GoHighLevel automations that nurture every lead, score intent, and notify sales the moment a deal warms up.',
      icon: 'brain',
      meta: ['Pipelines', 'Playbooks', 'Sales Alerts'],
    },
    {
      title: 'Webhook & API Integrations',
      description:
        'Ship reliable webhook and API bridges that push clean data between your product, CRM, billing, and analytics stack.',
      icon: 'webhook',
      meta: ['REST', 'GraphQL', 'Webhooks'],
    },
    {
      title: 'Alerts & Notifications',
      description:
        'Pipe mission-critical alerts into Slack, Discord, Gmail, or SMS with smart routing, throttling, and contextual summaries.',
      icon: 'bellRing',
      meta: ['Slack', 'Discord', 'Gmail', 'SMS'],
    },
    {
      title: 'SOPs & Documentation',
      description:
        'Turn tribal knowledge into living SOPs and Loom-backed documentation so every automation stays transparent and trainable.',
      icon: 'fileText',
      meta: ['Playbooks', 'Loom', 'Notion'],
    },
    {
      title: 'Process Optimization',
      description:
        'Audit every touchpoint, remove manual bottlenecks, and layer AI copilots that keep teams focused on high-leverage work.',
      icon: 'gauge',
      meta: ['Audits', 'KPIs', 'AI Copilots'],
    },
    {
      title: 'Social Media Orchestration',
      description:
        'Schedule AI-written posts, reels, shorts, and carousels across Facebook, Instagram, TikTok, LinkedIn, X, and YouTube from one command center.',
      icon: 'share2',
      meta: ['FB', 'IG', 'TikTok', 'LinkedIn', 'YouTube', 'X'],
    },
    {
      title: 'AI Voice & Agent Stack',
      description:
        'Deploy voice agents powered by Retell, VAPI, and ElevenLabs that answer questions, qualify leads, and book meetings in real time.',
      icon: 'waves',
      meta: ['Retell', 'VAPI', 'ElevenLabs'],
    },
    {
      title: 'Revenue Intelligence Dashboards',
      description:
        'Stand up revenue command centers inside Google Looker that track pipeline velocity, feature adoption, and sales KPIs from a single canvas.',
      icon: 'barChart3',
      meta: ['Looker', 'Sales Ops', 'Feature KPIs'],
    },
  ],
}
