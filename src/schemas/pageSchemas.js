import ayodele from '@/assets/ayodele.png';
import babarinde from '@/assets/babarinde.png';
import bridge from '@/assets/bridge.png';
import chinyere from '@/assets/chinyere.png';
import emzor from '@/assets/emzor.png';
import event from '@/assets/event.png';
import group from '@/assets/group.png';
import hba from '@/assets/hba-africa.png';
import health from '@/assets/health.png';
import hfn_partner from '@/assets/hfn_partner.png';
import jennifer from '@/assets/jennifer.png';
import njide from '@/assets/njide.png';
import oando from '@/assets/oando_logo.png';
import pharm from '@/assets/pharm.png';
import reagan from '@/assets/reagan.png';
import society from '@/assets/society.png';
import wef from '@/assets/wef.jpg';

export const pageSchemas = {
  home: {
    hero: {
    titleHighlight: 'Healthcare',
    titleMain: 'Advocacy.',
    introLine: 'We speak with one voice on behalf of the Nigerian Private Health Sector.',
    introText:
      'The private health sector provides over 60% of healthcare to Nigerians.',
    subText:
      'We facilitate regular strategic dialogues between the private sector and government to promote the development of beneficial healthcare sector policies.',
    ctaText: 'Join the Coalition ->',
    ctaLink: '/register',
    heroImage: 'hero-main',
  },

    partners: {
      title: 'Health Guardians',
      logos: ['pharm', 'society', 'bridge', 'emzor', 'hba'],
    },

    story: {
      title: 'Our HFN Story',
      body: 'The Healthcare Federation of Nigeria (HFN) is the umbrella body for private healthcare stakeholders in Nigeria, representing the interests of health professionals, companies, investors, associations, and institutions. HFN provides members with access to advocacy platforms, strategic collaborations, knowledge-sharing, and investment opportunities aimed at building a stronger, more resilient health system.',
      stats: [
        { label: 'Vision', value: '1' },
        { label: 'Registered Health Guardians', value: '6+' },
        { label: 'Partners', value: '5+' },
        // { label: 'Projects Executed', value: '10' },
        // { label: "Patient's assistance", value: '20' },
        // { label: 'Registered Diasporians', value: '5+' },
      ],
    },

    news: {
      months: {
        'October 2025': {
          featured: {
            image: hfn_partner,
            tag: 'Programs & Initiatives',
            date: 'October 10, 2025',
            comments: 0,
            description:
              'Healthcare Federation of Nigeria (HFN) hosted a High-Level Roundtable on Local Manufacturing of Medicines in Nigeria with the World Bank Group and NEPAD.',
          },
          newsList: [
            {
              image: health,
              tag: 'Programs & Initiatives',
              date: 'October 10, 2025',
              comments: 12,
              description:
                'Nigeria continues to push boundaries in healthcare innovation through HFN-led collaborations.',
            },
            {
              image: wef,
              tag: 'Health Alert',
              date: 'October 9, 2025',
              comments: 5,
              description:
                'HFN President joins global health leaders at the WEF in Dubai to discuss investments in healthcare.',
            },
            {
              image: event,
              tag: 'Public Health Stories',
              date: 'October 8, 2025',
              comments: 10,
              description:
                'HFN participated in the Eko Health Convention, focusing on driving innovation in Lagos healthcare.',
            },
          ],
        },
        'September 2025': {
          featured: {
            image: group,
            tag: 'Health Policy',
            date: 'September 18, 2025',
            comments: 7,
            description:
              'HFN met with the Federal Ministry of Health to discuss strengthening healthcare policy frameworks.',
          },
          newsList: [
            {
              image: pharm,
              tag: 'Programs & Initiatives',
              date: 'September 15, 2025',
              comments: 4,
              description:
                'HFN continues its collaboration with pharmaceutical partners to ensure access to quality medicines.',
            },
            {
              image: oando,
              tag: 'Health Alert',
              date: 'September 10, 2025',
              comments: 6,
              description:
                'Oando Foundation and HFN partner to improve workplace health and wellness programs.',
            },
            {
              image: hba,
              tag: 'Public Health Stories',
              date: 'September 2, 2025',
              comments: 3,
              description:
                'HFN hosted a national workshop on healthcare business sustainability strategies.',
            },
          ],
        },
        'August 2025': {
          featured: {
            image: emzor,
            tag: 'Programs & Initiatives',
            date: 'August 20, 2025',
            comments: 3,
            description:
              'HFN collaborated with Emzor Pharmaceuticals to discuss the future of local drug production.',
          },
          newsList: [
            {
              image: society,
              tag: 'Health Alert',
              date: 'August 18, 2025',
              comments: 2,
              description:
                'Society for Family Health and HFN partner to improve primary care delivery systems.',
            },
            {
              image: bridge,
              tag: 'Public Health Stories',
              date: 'August 12, 2025',
              comments: 1,
              description:
                'Bridge Clinic joins HFN network to promote advanced fertility care across Nigeria.',
            },
            {
              image: health,
              tag: 'Programs & Initiatives',
              date: 'August 5, 2025',
              comments: 4,
              description:
                'HFN launched its Healthcare Innovation Accelerator to support health-tech startups.',
            },
          ],
        },
      },
    },
    executives: [
      {
        name: 'Mrs. Njide Ndili',
        position: 'President, HFN',
        role: 'Country Director, PharmAccess',
        image: njide,
      },
      {
        name: 'Dr. Ayodele Benson-Cole',
        position: '1st Vice President, HFN',
        role: 'CEO, Benson Coleman & Associates',
        image: ayodele,
      },
      {
        name: 'Dr. Jennifer Anyanti',
        position: '2nd Vice President, HFN',
        role: 'Deputy Managing Director, Society for Family Health',
        image: jennifer,
      },
      {
        name: 'Mrs. Chinyere Okorocha',
        position: 'Public Relations Secretary, HFN',
        role: 'Head of Sectors, Jackson, Etti & Edu',
        image: chinyere,
      },
      {
        name: 'Mr. Olayode Babarinde',
        position: 'Financial Secretary, HFN',
        role: 'Healthcare System Partner – Policy, Roche',
        image: babarinde,
      },
      {
        name: 'Mr. Reagan Rowland',
        position: 'Treasurer, HFN',
        role: 'Founder/CEO, OneClick Med',
        image: reagan,
      },
    ],

    faqs: [
      {
        question: 'What paves the Healthcare Federation of Nigeria (HFN) on?',
        answer:
          'The HFN is paved on the mission to provide a unified voice for the private healthcare sector in Nigeria, fostering collaboration, promoting best practices, and driving policy change to achieve universal health coverage.',
      },
      {
        question: 'How can I join HFN?',
        answer:
          "Membership is open to all legitimate private sector entities and individuals involved in the healthcare value chain, including hospitals, pharmaceutical companies, insurance providers, and technical service organizations. You can find the application form on our 'Membership' page.",
      },
      {
        question: 'What are the benefits of HFN membership?',
        answer:
          'Benefits include policy advocacy, networking opportunities with key industry leaders, access to exclusive research and reports, training programs, and a platform to influence the future of healthcare policy in Nigeria.',
      },
      {
        question: 'What does HFN do?',
        answer:
          'Healthcare Federation Of Nigeria is independent of any governmental/political ideology, economic interest, religious affiliation; and is mission is centered on advocacy, capacity building, and improving access to finance for the private sector, all in collaboration with the public sector.',
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
  contact: {
    hero: {
      headline: "Let's keep in touch!",
      subheadline:
        'Healthcare Federation of Nigeria would love to hear from you.',
      description:
        'For any inquiries, partnerships, or further information on how we can work together to improve healthcare in Nigeria, feel free to reach out to us through any of the following contact options.',
      image: 'globe.png',
      backgroundColor: 'bg-[#F2F9F3]',
    },

    form: {
      title: 'Contact Us',
      description:
        'We are here to help! Whether you have a question about our service, need assistance with your account, or want to provide feedback, our team is ready to assist you.',
      fields: [
        {
          id: 'name',
          label: 'Name',
          type: 'text',
          placeholder: 'Enter name',
          required: true,
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'Enter email',
          required: true,
        },
        {
          id: 'subject',
          label: 'Subject',
          type: 'text',
          placeholder: '',
          required: true,
        },
        {
          id: 'message',
          label: 'Message',
          type: 'textarea',
          placeholder: '',
          rows: 5,
          required: true,
        },
      ],
      submitButtonText: 'Send Message',
    },

    contactDetails: {
      address: {
        text: '109A, Awolowo Road, Ikoyi, Opposite Standard Chartered Bank, Lagos.',
        googleMapsUrl: 'https://maps.google.com/...',
      },
      emails: [
        { label: 'General Inquiries', address: 'info@hfnigeria.com' },
        {
          label: 'Executive Secretary',
          address: 'executivesecretary@hfnigeria.com',
        },
      ],
      phone: '+234 803 975 3274',
      socialMedia: [
        {
          platform: 'Facebook',
          url: 'https://www.facebook.com/hfnigeria',
          icon: 'fab fa-square-facebook',
        },
        {
          platform: 'Instagram',
          url: 'https://www.instagram.com/hfnigeria',
          icon: 'fab fa-square-instagram',
        },
        {
          platform: 'LinkedIn',
          url: 'https://www.linkedin.com/company/hfnigeria',
          icon: 'fa-brands fa-linkedin',
        },
        {
          platform: 'Twitter/X',
          url: 'https://x.com/hfnigeria',
          icon: 'fab fa-square-x-twitter',
        },
      ],
    },

    map: {
      iframeUrl:
        'https://maps.google.com/maps?q=109+Awolowo+Road,+Ikoyi,+Lagos,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed',
      height: 500,
      borderWeight: 4,
      borderColor: 'border-green-200',
    },
  },
  events: {
    hero: {
      titleLine1: 'Upcoming Events',
      titleLine2: 'Speaking with one voice for the private health sector',
      description:
        "Stay updated with our latest conferences, webinars, and community programs. Whether you're looking to expand your knowledge, network with industry leaders, or engage with our vibrant community, there's an event for you.",
      image: 'latest_news.png',
      backgroundColor: '#E87A1814',
    },

    searchAndFilter: {
      title: 'Find your next event',
      years: ['2026', '2025', '2024'],
      categories: [
        'Webinar',
        'Conference',
        'Workshop',
        'Annual General Meeting',
      ],
    },

    featuredEvent: {
      id: 'featured-1',
      tag: 'Members Only',
      title: '2026 HFN Annual Conference',
      date: 'Wednesday, March 4th 2026',
      location: 'Lagos Oriental Hotel Lagos, LA',
      description:
        'Join HFN 2026 to explore bold private-sector solutions driving healthcare financing and Universal Health Coverage in Nigeria. The Healthcare Federation of Nigeria (HFN) invites you to the HFN Annual Conference 2026, Nigeria’s premier gathering of private-sector healthcare leaders, policymakers, financiers, innovators, and development partners.',
      image: 'event2026.png',
      registerLink: 'https://tix.africa/claim/...',
    },

    eventList: {
      title: 'Latest Events',
      items: [
        {
          id: 1,
          title: '2026 HFN Annual Conference',
          category: 'Member Only',
          date: 'Wednesday, March 4th 2026',
          time: '10:00 AM',
          location: 'Lagos Oriental Hotel Lagos, LA',
          frequency: 'Free for Members',
          description:
            'Join HFN 2026 to explore bold private-sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.',
          image: 'event2026.png',
          registerLink: 'https://tix.africa/claim/...',
        },
        {
          id: 2,
          title: '2026 HFN Annual Conference',
          category: 'Non-members',
          date: 'Wednesday, March 4th 2026',
          time: '10:00 AM',
          location: 'Lagos Oriental Hotel Lagos, LA',
          frequency: 'Dollar Payment',
          description:
            'Join HFN 2026 to explore bold private-sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.',
          image: 'event2026.png',
          registerLink: 'https://www.eventbrite.com/...',
        },
        {
          id: 3,
          title: '2026 HFN Annual Conference',
          category: 'Non-members',
          date: 'Wednesday, March 4th 2026',
          time: '10:00 AM',
          location: 'Lagos Oriental Hotel Lagos, LA',
          frequency: 'Naira Payment',
          description:
            'Join HFN 2026 to explore bold private-sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.',
          image: 'event2026.png',
          registerLink: 'https://tix.africa/discover/...',
        },
      ],
    },
  },
  gallery: {
    hero: {
      titleLine1: 'Event Gallery',
      titleLine2: 'Relive Our Moments',
      description:
        'Explore the highlights of our past conferences, workshops, and community engagements. Witness the impact and the vibrant energy of our network in action.',
      image: 'latest_news.png',
      backgroundColor: '#E87A1814',
    },

    filtering: {
      title: 'Filter Memories',
      years: ['2026', '2025', '2024'],
      categories: [
        'Conferences',
        'Workshops',
        'Community Outreaches',
        'Webinar',
        'Gala',
      ],
    },

    galleryList: {
      items: [
        {
          id: 1,
          title: 'Digital Skills Bootcamp 2025',
          category: 'Workshop',
          date: 'November 20, 2025',
          image: 'awards.png',
          year: '2025',
        },
        {
          id: 2,
          title: 'Women in Tech Summit',
          category: 'Conference',
          date: 'December 5, 2025',
          image: 'latest_news.png',
          year: '2025',
        },
        {
          id: 3,
          title: 'Community Outreach Lagos',
          category: 'Social',
          date: 'October 12, 2025',
          image: 'awards.png',
          year: '2025',
        },
        {
          id: 4,
          title: 'Health & Wellness Webinar',
          category: 'Webinar',
          date: 'January 12, 2026',
          image: 'latest_news.png',
          year: '2026',
        },
        {
          id: 5,
          title: 'Annual Leadership Awards',
          category: 'Gala',
          date: 'December 20, 2025',
          image: 'awards.png',
          year: '2025',
        },
        {
          id: 6,
          title: 'Tech Innovation Expo',
          category: 'Conference',
          date: 'March 15, 2026',
          image: 'latest_news.png',
          year: '2026',
        },
      ],
      hasMore: true,
      nextCursor: 2,
    },
  },
  getInvolved: {
    hero: {
      titleLine1: 'Join the Movement',
      titleLine2: 'Transform Healthcare in Nigeria',
      description:
        'Partner with us to build a stronger, healthier Nigeria through innovation, advocacy, and collaboration. Together, we can make quality healthcare accessible to every citizen.',
      image: 'latest_news.png',
      backgroundColor: 'bg-green-50',
    },

    partnerships: {
      title: 'Partnerships',
      introParagraphs: [
        'Healthcare Federation Of Nigeria is independent of any government/political ideology, economic interest, religious affiliation, and is mainly funded by our membership and volitional donations from well-meaning Nigerians.',
        "This vision is anchored on a 'patient-centric' approach to policy advocacy which is our driving force. This is anchored on the simple conclusion that, if life is basic and fundamental, there is no reason why the patient should suffer due to a faulty health system. We are the voice for advocating better healthcare in Nigeria that human life.",
        'Our Partners support HFN in the medium and long term via our specially designed offerings, including:',
      ],

      offerings: [
        {
          id: 'event-sponsorship',
          title: 'Event Sponsorship',
          description:
            'HFN hosts over 10 events every year, attracting top policy makers, both physical and online. Sponsors can select from our various events and external delegates via different packages. This is a unique opportunity to identify opportunities that align with your brand.',
          instructionText:
            'To learn more about this programme, please contact our partnership team',
          buttonText: 'Contact Us',
          link: '/contact',
        },
        {
          id: 'exhibitor-stands',
          title: 'Exhibitor Stands',
          description:
            'This is an excellent way to showcase your brand directly to healthcare providers, key decision-makers and stakeholders within the healthcare sector. At various events, we can also offer exclusive packages.',
          instructionText: 'For further details, contact our team',
          buttonText: 'Contact Us',
          link: '/contact',
        },
        {
          id: 'advertisements',
          title: 'Advertisements',
          description:
            'Our Quarterly Newsletter is distributed to all our members and to various categories of healthcare professions. We accept advertisements ranging from a half page to double page spreads, subject to editorial approval by the secretary.',
          instructionText: 'For pricing, contact our team.',
          buttonText: 'Contact Us',
          link: '/contact',
        },
      ],
    },

    donate: {
      title: 'Donate',
      content:
        'Every contribution helps enable us to share knowledge and foster collaboration amongst our global network of healthcare professionals, improving patient outcomes for better lives. Whether you’d like to make a one-off gift or set up a regular payment, it’s easy to donate online. Click the button to get started.',
      buttonText: 'Donate Now',
      externalLink: 'https://donation-provider.com/hfn',
    },

    volunteer: {
      title: 'Volunteer',
      tagline:
        'Whether in logistics, community outreach, or event support, there’s always a role for you.',
      description:
        'Join our network of passionate volunteers working together to improve healthcare outcomes in Nigeria.',
      buttonText: 'Sign Up Now',
      backgroundColor: '#F2F9F3',
    },
  },
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
  programs: {
    hero: {
      titleLine1: 'Empowering Healthcare',
      titleLine2: 'Through Sustainable Programs',
      description:
        'Our programs are designed to create long-term impact within Nigeria’s healthcare ecosystem. From digital innovation to quality improvement and workforce development, the Healthcare Federation of Nigeria (HFN) leads initiatives that strengthen systems, support professionals, and improve patient outcomes nationwide.',
      image: 'latest_news.png',
      backgroundColor: '#E87A1814',
    },

    ongoingSection: {
      title: 'Programs & Initiatives',
      subtitle: 'Ongoing Programs',
      description:
        'HFN’s ongoing programs address workforce gaps, policy advocacy, and system inefficiencies. Each initiative is designed to deliver measurable outcomes and sustainable change within Nigeria’s healthcare landscape.',

      projects: [
        {
          id: 1,
          title: 'Project 1',
          summary:
            'Leveraging technology to improve patient care, enhance hospital efficiency, and expand access to telemedicine across urban and rural areas.',
          image: 'group.png',
          problem:
            'Nigeria’s healthcare sector faces gaps in data management, limited patient tracking, and poor digital record systems that slow down service delivery.',
          solution:
            'Implementation of interoperable digital health systems and training healthcare professionals on e-health tools for real-time patient management.',
          outcomes:
            'Improved efficiency in care coordination, enhanced data accuracy, and expanded access to telehealth solutions nationwide.',
          layoutReverse: false,
        },
        {
          id: 2,
          title: 'Project 2',
          summary:
            'Strengthening the capacity of Nigeria’s healthcare professionals through leadership training, technical upskilling, and mentorship opportunities.',
          image: 'group.png',
          problem:
            'The shortage of qualified healthcare workers and migration of skilled professionals continue to hinder access to quality care in many regions.',
          solution:
            'Launching continuous professional development programs, mentorship initiatives, and policy dialogues to improve retention and career growth.',
          outcomes:
            'A more skilled, motivated, and well-distributed healthcare workforce equipped to meet Nigeria’s growing health demands.',
          layoutReverse: true,
          useAlternativeBg: true,
        },
      ],
    },

    pastInitiatives: {
      title: 'Past Initiatives',
      description:
        'Over the years, HFN has implemented multiple programs that have advanced healthcare quality, access, and policy advocacy across Nigeria. Here are a few notable initiatives.',
      list: [
        {
          title: 'Quality Improvement & Patient Safety Program Project',
          description:
            'Enhanced clinical governance through training on patient safety and standard operating procedures for private and public hospitals.',
          image: 'hands.png',
          link: '#',
        },
        {
          title: 'Access to Care Project',
          description:
            'Partnered with community clinics and mobile health teams to provide essential services to underserved populations.',
          image: 'hands.png',
          link: '#',
        },
        {
          title: 'Policy Dialogue Series Project',
          description:
            'Created a platform for government and private sector leaders to collaborate on national health reforms and sustainable financing.',
          image: 'hands.png',
          link: '#',
        },
      ],
    },
  },
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
        {
          id: 3,
          title: 'Solar-Powered Clinics in Kaduna',
          excerpt:
            'In collaboration with donor agencies, HFN supported Kaduna’s investment in solar-powered clinics, ensuring sustainable and reliable care in rural communities.',
          image: 'newsletter.png',
          date: 'October 24, 2025',
          commentCount: 2,
          downloadUrl: '#',
        },
        {
          id: 4,
          title: 'HFN at World Economic Forum Health Innovators Group',
          excerpt:
            'A delegation from HFN joined the World Economic Forum’s Health Innovators Group to discuss equitable access to care, technology-driven solutions, and investment opportunities for Africa.',
          image: 'newsletter.png',
          date: 'October 24, 2025',
          commentCount: 2,
          downloadUrl: '#',
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 2,
      },
    },

    publicationsSection: {
      title: 'Publications',
      backgroundColor: '#F2F9F3',
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
