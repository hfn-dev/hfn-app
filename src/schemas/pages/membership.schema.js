export const membershipPageSchema = {
  membership: {
    hero: {
      headline: 'Unite. Influence. Transform.',
      subheadline: 'A digital coalition driving policy and innovation.',
      description:
        'Within the professional network, HFN offers access to a secure member directory that shapes industry dialogue, and tap into exclusive, high-impact collaborations.',
      image: 'handsJoining.jpg',
    },

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
        id: 'multinational',
        name: 'Multinational',
        price: '₦750,000',
        billingCycle: 'per year',
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
        id: 'association',
        name: 'Association',
        price: '₦150,000',
        billingCycle: 'per year',
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
        id: 'diaspora',
        name: 'Diaspora',
        price: '$50',
        billingCycle: 'per year',
        benefits: [
          'Advocacy/Public-Private Engagement project',
          'Networking/High Profile Breakfast Meetings',
          'Access to Finance',
          'Promotion & Brand Visibility',
          'Access to Industry Information for Members Only',
          'Partnership & Engagement with International Organizations',
        ],
      },
    ],

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
          {
            boldTitle: 'Improvement of the Operating Environment:',
            text: 'HFN actively engages in lobbying and advocacy to create a more enabling and sustainable environment for healthcare operations.',
          },
          {
            boldTitle: 'Opportunity to Shape the Future:',
            text: 'Members enjoy ongoing opportunity to contribute to shaping the policies and frameworks that determine the fortunes of Nigeria’s healthcare sector.',
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
            text: 'Through its diverse membership base, HFN promotes sectoral, inter-sectoral, and multi-stakeholder collaboration across the healthcare value chain.',
          },
          {
            boldTitle: 'Networking with Industry Leaders:',
            text: 'Members enjoy access to exclusive networking events such as dinners, luncheons, and business forums with public and private industry policymakers, and international partners.',
          },
          {
            boldTitle: 'Linkages and Business Development:',
            text: 'Members gain access to both local and international partnerships, with referrals through business/private sector groups such as LCCI, NASIMA, and the Nigeria-South Africa Chamber of Commerce.',
          },
          {
            boldTitle: 'Enhanced Access to Investment Opportunities:',
            text: 'Members benefit from linkages to funding and investment institutions for health innovation and expansion.',
          },
          {
            boldTitle: 'Invitation to Field Trips and International Programs:',
            text: 'Participate in study tours, exchange programs, and global health forums.',
          },
        ],
      },
      {
        id: 'knowledge',
        label: 'Information, Knowledge, and Capacity Development.',
        titleHtml:
          'Information, <br />Knowledge, <br />and Capacity <br />Development.',
        theme: 'green',
        content: [
          {
            boldTitle: 'Access to Data and Sector Information:',
            text: 'Members have exclusive access to research data, policy briefs, and insights on healthcare trends and opportunities.',
          },
          {
            boldTitle: 'Information on Policies and Regulations:',
            text: 'Receive timely updates on emerging policies and how they impact members’ businesses.',
          },
          {
            boldTitle: 'Subsidized Training and Conferences:',
            text: 'Members enjoy discounted participation in HFN conferences, training programs, and workshops.',
          },
          {
            boldTitle: 'Right of First Refusal:',
            text: 'Members receive priority consideration for opportunities and initiatives within the Federation.',
          },
        ],
      },
      {
        id: 'digital',
        label: 'Digital and Media Visibility.',
        titleHtml: 'Digital and <br />Media Visibility.',
        theme: 'orange',
        content: [
          {
            boldTitle: 'Membership Access to Website:',
            text: 'Fully-subscribed members have unlimited access to restricted sections of the HFN website, containing premium content and opportunities.',
          },
          {
            boldTitle: 'Increased Publicity:',
            text: 'Registered members’ profiles are published on the HFN website, providing visibility to potential partners and clients.',
          },
          {
            boldTitle: 'Advertisement Opportunities:',
            text: 'Members can advertise products and services on the HFN website and through HFN communication channels.',
          },
          {
            boldTitle: 'International Exposure:',
            text: 'Through HFN’s partnerships with international bodies such as the IFC and other development agencies, members gain global recognition and visibility.',
          },
        ],
      },
      {
        id: 'support',
        label: 'Member Support, Benefits, and Privileges.',
        titleHtml: 'Member Support, Benefits, <br />and Privileges.',
        theme: 'green',
        content: [
          {
            boldTitle: 'HFN Support and Endorsement:',
            text: 'Members benefit from the Federation’s credibility, brand recognition, and endorsements.',
          },
          {
            boldTitle: 'Access to Discounted Services:',
            text: 'Enjoy exclusive discounts on products and services offered by fellow members and partner organizations.',
          },
          {
            boldTitle: 'Membership Card:',
            text: 'Members receive an official HFN Membership Card which grants access to discounts and benefits.',
          },
          {
            boldTitle: 'Job Offers and Recruitment Support:',
            text: 'Members can access job postings, recruitment adverts, and downloadable resumes from the HFN database.',
          },
        ],
      },
    ],
  },
};
