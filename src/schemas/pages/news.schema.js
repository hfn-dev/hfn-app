export const newsPageSchema = {
  news: {
    hero: {
      titleLine1: 'Stay Informed:',
      titleLine2: 'Latest Healthcare News & Updates',
      description:
        'Get the latest insights, announcements, and policy developments from the Healthcare Federation of Nigeria and across the health sector.',
      image: 'latest_news.png',
      backgroundColor: '#E87A1814',
    },

    latestNewsSection: {
      title: 'Latest News',
      filters: ['October 2025', 'September 2025', 'August 2025'],
      articles: [
        {
          id: 1,
          title:
            'Lagos State Ministry of Health Emergency Response Partnership',
          excerpt:
            'The Lagos State Ministry of Health has partnered with private hospitals to enhance emergency response times across key districts. This initiative, supported by HFN, ensures faster patient care and improved coordination among healthcare facilities.',
          image: 'event.png',
          date: 'October 24, 2025',
          commentCount: 2,
          link: '/news/lagos-emergency-partnership',
          slug: 'lagos-emergency-partnership'
        },
        {
          id: 2,
          title: 'Stakeholder Convention on Digital Health Transformation',
          excerpt:
            'The Healthcare Federation of Nigeria convened stakeholders from public and private sectors to discuss frameworks for digital health transformation, data management, and interoperability standards.',
          image: 'group.png',
          date: 'October 24, 2025',
          commentCount: 2,
          link: '/news/digital-health-convention',
          slug: 'stakeholder-convention-on-digital'
        },
        {
          id: 3,
          title: 'Solar-Powered Clinics Initiative in Kaduna',
          excerpt:
            'In collaboration with donor agencies, HFN supported Kaduna’s investment in solar-powered clinics, ensuring sustainable and reliable care in rural communities.',
          image: 'group1.png',
          date: 'October 24, 2025',
          commentCount: 2,
          link: '/news/kaduna-solar-clinics',
          slug: 'solar-powered-clinics-initiative'
        },
        {
          id: 4,
          title: 'HFN Delegation at World Economic Forum',
          excerpt:
            'A delegation from HFN joined the World Economic Forum’s Health Innovators Group to discuss equitable access to care, technology-driven solutions, and investment opportunities for Africa.',
          image: 'wef.jpg',
          date: 'October 24, 2025',
          commentCount: 2,
          link: '/news/wef-health-innovators',
          slug: 'hfn-delegation-at-world'
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 2,
      },
    },

    policyAdvocacySection: {
      title: 'Policy & Advocacy',
      backgroundColor: '#F2F9F3',
      updates: [
        {
          id: 1,
          title:
            'Strengthening Emergency Healthcare in Nigeria through Partnership.',
          description:
            'HFN and the Federal Ministry of Health jointly announced a new partnership model to enhance emergency medical infrastructure across Nigeria’s six geopolitical zones.',
          image: 'hands.png',
          link: '#',
        },
        {
          id: 2,
          title: 'Policy Framework for Health Technology Adoption',
          description:
            'HFN’s Policy and Advocacy team released a new white paper encouraging structured regulation and faster adoption of digital health tools in clinical settings.',
          image: 'hands.png',
          link: '#',
        },
        {
          id: 3,
          title: 'Public-Private Dialogue on Universal Health Coverage (UHC)',
          description:
            'Stakeholders met in Abuja to evaluate funding mechanisms and policy frameworks driving Nigeria’s progress toward universal access to affordable healthcare.',
          image: 'hands.png',
          link: '#',
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 2,
      },
    },
  },
};
