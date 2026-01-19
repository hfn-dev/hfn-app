export const pageSchemas = {
  home: {
    hero: {
      titleHighlight: 'Healthcare',
      titleMain: 'Advocacy.',
      introLine: 'Healthcare Federation of Nigeria',
      introText:
        'encourage and facilitate opportunities for public-private partnerships and engagement with diverse stakeholders in the healthcare sector.',
      subText:
        'We speak with one voice on behalf of the Nigerian Private Health Sector.',
      ctaText: 'Join the Coalition ->',
      ctaLink: '/register',
      heroImage: 'hero-main',
    },

    partners: {
      title: 'Health Guardians',
      logos: ['pharm', 'society', 'bridge', 'emzor', 'hba', 'oando'],
    },

    story: {
      title: 'Our HFN Story',
      body: 'The Healthcare Federation of Nigeria (HFN) is the umbrella body for private healthcare stakeholders in Nigeria...',
      stats: [
        { label: 'Vision', value: '1' },
        { label: 'Registered Health Guardians', value: '100+' },
        { label: 'Partners', value: '10+' },
        { label: 'Projects Executed', value: '104' },
        { label: "Patient's assistance", value: '1200' },
        { label: 'Registered Diasporians', value: '50+' },
      ],
    },

    news: {
      months: {
        'October 2025': {
          featured: {
            image: 'hfn_partner',
            tag: 'Programs & Initiatives',
            date: 'October 10, 2025',
            comments: 0,
            description: '',
          },
          list: [],
        },
      },
    },

    executives: [
      {
        name: '',
        position: '',
        role: '',
        image: '',
      },
    ],

    faqs: [
      {
        question: '',
        answer: '',
      },
    ],
  },
  about: {
    hero: {
      title: 'Who We Are',
      subtitle: "The Unified Voice of Nigeria's Private Healthcare Sector",
      description:
        'Dedicated to collective action and policy advocacy to improve health outcomes for all Nigerians.',
      image: 'about-hero-bg',
    },

    missionVision: {
      mission: {
        title: 'Our Mission',
        text: 'To create an enabling environment for the private healthcare sector in Nigeria through advocacy, partnership, and capacity building.',
        icon: 'target-icon',
      },
      vision: {
        title: 'Our Vision',
        text: 'A thriving private healthcare sector that contributes significantly to achieving universal health coverage in Nigeria.',
        icon: 'eye-icon',
      },
    },

    values: {
      title: 'Our Core Values',
      list: [
        {
          title: 'Integrity',
          description:
            'Transparency and ethical conduct in all our engagements.',
          icon: 'shield',
        },
        {
          title: 'Collaboration',
          description:
            'Fostering partnerships across the healthcare value chain.',
          icon: 'users',
        },
        {
          title: 'Innovation',
          description:
            'Driving modern solutions to age-old healthcare challenges.',
          icon: 'lightbulb',
        },
        {
          title: 'Impact',
          description:
            'Ensuring our advocacy results in tangible patient benefits.',
          icon: 'trending-up',
        },
      ],
    },

    history: {
      title: 'Our Evolution',
      milestones: [
        {
          year: '2013',
          event: 'Conceptualization and initial stakeholder engagement.',
        },
        {
          year: '2014',
          event: 'Official registration and launch of the Federation.',
        },
        {
          year: '2018',
          event:
            'Key policy breakthrough in public-private partnership frameworks.',
        },
        {
          year: '2024',
          event: 'Exceeding 100+ registered health guardians and partners.',
        },
      ],
    },

    governance: {
      title: 'Governance & Structure',
      description:
        'HFN is governed by an elected Executive Committee representing various sub-sectors of the health industry, ensuring balanced advocacy.',
      structureImage: 'hfn-org-chart',
    },
  },
};
