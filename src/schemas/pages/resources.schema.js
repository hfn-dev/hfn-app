export const resourcesPageSchema = {
  resources: {
    hero: {
      titleLine1: 'Stay Informed:',
      titleLine2: 'Latest Healthcare News & Updates',
      description:
        'Get the latest insights, announcements, and policy developments from the Healthcare Federation of Nigeria and across the health sector.',
      image: 'latest_news.png',
      backgroundColor: '#E87A1814',
    },

    newsletterSection: {
      title: 'Newsletter',
      // 4-column grid items
      items: [
        {
          id: 1,
          title: 'Lagos State Ministry of Health Partnership',
          excerpt:
            'The Lagos State Ministry of Health has partnered with private hospitals to enhance emergency response times across key districts...',
          image: 'newsletter.png',
          date: 'October 24, 2025',
          commentCount: 2,
          downloadUrl: '/downloads/newsletters/lagos-partnership.pdf',
        },
        {
          id: 2,
          title: 'Stakeholder Convention on Digital Health',
          excerpt:
            'The Healthcare Federation of Nigeria convened stakeholders from public and private sectors to discuss frameworks for digital health...',
          image: 'newsletter.png',
          date: 'October 24, 2025',
          commentCount: 2,
          downloadUrl: '/downloads/newsletters/digital-health.pdf',
        },
        // ... more newsletter items
      ],
      pagination: {
        currentPage: 1,
        totalPages: 2,
      },
    },

    publicationsSection: {
      title: 'Publications',
      backgroundColor: '#F2F9F3',
      // 3-column grid items
      items: [
        {
          id: 1,
          title:
            'Strengthening Emergency Healthcare in Nigeria through Partnership.',
          description:
            'HFN and the Federal Ministry of Health jointly announced a new partnership model to enhance emergency medical infrastructure...',
          image: 'hands.png',
          downloadUrl:
            '/downloads/publications/emergency-healthcare-whitepaper.pdf',
        },
        {
          id: 2,
          title: 'Policy Framework for Health Technology Adoption',
          description:
            'HFN’s Policy and Advocacy team released a new white paper encouraging structured regulation and faster adoption of digital health tools.',
          image: 'hands.png',
          downloadUrl: '/downloads/publications/tech-adoption-framework.pdf',
        },
        {
          id: 3,
          title: 'Public-Private Dialogue on Universal Health Coverage (UHC)',
          description:
            'Stakeholders met in Abuja to evaluate funding mechanisms and policy frameworks driving Nigeria’s progress toward universal access.',
          image: 'hands.png',
          downloadUrl: '/downloads/publications/uhc-dialogue-report.pdf',
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 2,
      },
    },
  },
};
