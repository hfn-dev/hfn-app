export const membershipPageSchema = {
  membership: {
    hero: {
      headline: 'Unite. Influence. Transform.',
      subheadline: 'A digital coalition driving policy and innovation.',
      description:
        'Within the professional network, HFN offers access to a secure member directory that shapes industry dialogue, and tap into exclusive, high-impact collaborations.',
      image: 'handsJoining.jpg',
    },

    // Tiered pricing and benefits section
    categories: [
      {
        id: 'individual',
        name: 'Individual',
        price: '₦50,000',
        billingCycle: 'per year',
        description: 'Ideal for private and insurance companies',
        benefits: [
          'Advocacy/Public-Private Engagement project',
          'Networking/High Profile Breakfast Meetings',
          'Access to Finance',
          'Promotion & Brand Visibility',
          'Access to Industry Information for Members Only',
          'Partnership & Engagement with International Organizations',
        ],
      },
      {
        id: 'corporate',
        name: 'Corporate',
        price: '₦200,000',
        billingCycle: 'per year',
        benefits: ['...same as individual'],
      },
      {
        id: 'multinational',
        name: 'Multinational',
        price: '₦750,000',
        billingCycle: 'per year',
        benefits: ['...standard benefits + global linkages'],
      },
      {
        id: 'association',
        name: 'Association',
        price: '₦150,000',
        billingCycle: 'per year',
        benefits: ['...standard benefits'],
      },
      {
        id: 'diaspora',
        name: 'Diaspora',
        price: '$50',
        billingCycle: 'per year',
        benefits: ['...standard benefits'],
      },
    ],

    // Interactive Tabs (The "HFN Members Enjoy..." section)
    valuePropositionTabs: [
      {
        id: 'policy',
        label: 'Policy Influence and Advocacy.',
        titleHtml: 'Policy Influence <br />and Advocacy.',
        theme: 'green',
        content: [
          {
            boldTitle: 'Representation in Policy and Decision-Making:',
            text: 'Members are represented in high-level national health policy discussions through HFN’s recognized advocacy platforms.',
          },
          {
            boldTitle: 'Policy Advocacy:',
            text: 'As the officially recognized body for the private health sector, HFN maintains close rapport with government policymakers.',
          },
        ],
      },
      {
        id: 'collaboration',
        label: 'Collaboration, Networking, and Exposure.',
        titleHtml: 'Collaboration, <br />Networking, <br />and Exposure.',
        theme: 'orange',
        content: [
          {
            boldTitle: 'Opportunities for Collaboration:',
            text: 'Promotes sectoral and multi-stakeholder collaboration across the healthcare value chain.',
          },
        ],
      },
      // ... other tabs: knowledge, digital, support
    ],

    // Member Directory Section
    directory: {
      title: 'Member Directory',
      searchPlaceholder: 'Search',
      alphabetFilters: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
      members: [
        'ABIOLA MORUF TAJUDEEN',
        'ANIEBE SOMTO EMELDA',
        'AROGUNDADE IFEOLUWAN THEOPHILUS',
        'ATAGUBA FRANKLIN',
      ],
      pagination: {
        currentPage: 1,
        totalPages: 10,
      },
    },
  },
};
