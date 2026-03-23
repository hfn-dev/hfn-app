export const getInvolvedPageSchema = {
  
    hero: {
      titleLine1: 'Engage With',
      subTitle: 'HFN',
      titleLine2: 'Beyond Membership',
      description:
        'Healthcare Federation of Nigeria (HFN) provides multiple pathways for individuals, organisations, and partners to support and engage with our work strengthening Nigeria’s healthcare system.',
      image:
        'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769892500/Women_gnwotm.jpg',
      backgroundColor: '#f2f9f3',
    },

    donations: {
      title: 'Donations',
      subtitle: 'Support HFN’s advocacy and sector-strengthening work',

      paragraphs: [
        'HFN welcomes contributions that support our work in policy advocacy, stakeholder convening, research, and public–private collaboration.',
        'Contributions help sustain HFN’s role as a credible platform for private sector engagement in health system reform.',
      ],

      note: 'Contributions are voluntary and support institutional activities aligned with HFN’s mission.',

      quote:
        'Your contribution helps us drive evidence-based reforms and build a more resilient healthcare ecosystem in Nigeria.',

      buttonText: 'Donate Now',
    },

    partnerships: {
      title: 'Partnerships & Sponsorships',
      tagline: 'Partner with HFN',
      description:
        'HFN works with local and international partners to deliver high-impact convenings, dialogues, and sector initiatives.',

      items: [
        {
          id: 'event-sponsorships',
          title: 'Event Sponsorships',
          description:
            'Sponsorship of HFN conferences, roundtables, and stakeholder dialogues attended by policymakers, private sector leaders, and development partners.',
          buttonText: 'Contact Us to Explore Partnerships',
        },
        {
          id: 'programme-support',
          title: 'Programme & Initiative Support',
          description:
            'Collaboration on policy dialogues, capacity-building programmes, and sector initiatives aligned with shared objectives.',
          buttonText: 'Contact Us to Explore Partnerships',
        },
      ],

      contactEmail: 'partnerships@hfnigeria.com',
    },

    opportunities: {
      items: [
        {
          id: 'exhibitor',
          title: 'Exhibitor Opportunities',
          description:
            'HFN events provide opportunities for organisations to showcase products, services, and innovations to a targeted audience of healthcare decision-makers. Exhibitor packages are available for selected events.',
          buttonText: 'Contact Us for Exhibitor Opportunities',
        },
        {
          id: 'advertising',
          title: 'Advertising & Visibility',
          description:
            'HFN offers limited advertising opportunities across its communication platforms, including its newsletter and selected publications, subject to editorial review.',
          buttonText: 'Contact Us for Advertising Enquiries',
        },
      ],
    },

    volunteering: {
      title: 'Volunteering',
      subtitle: 'Support HFN programmes and events',
      description:
        'HFN welcomes volunteers who wish to contribute time and expertise to support events, research, communications, and sector engagement activities. Volunteer opportunities are periodic and role-specific.',
      buttonText: 'Sign Up to Volunteer',
      backgroundColor: '#14532D',
    },

    donationModal: {
      title: "Support HFN's Mission",
      subtitle: 'Choose a contribution category',

      options: [
        {
          key: 'advocacy',
          title: 'Policy Advocacy',
          description:
            'Supporting HFN’s work in legislative and policy reforms.',
        },
        {
          key: 'research',
          title: 'Research & Insights',
          description:
            'Funding for healthcare sector research and data gathering.',
        },
        {
          key: 'convening',
          title: 'Stakeholder Convening',
          description:
            'Supporting dialogues between public and private health sectors.',
        },
        {
          key: 'general',
          title: 'General Support',
          description:
            'Contributions toward institutional mission-aligned activities.',
        },
      ],
    },
  
  
};
