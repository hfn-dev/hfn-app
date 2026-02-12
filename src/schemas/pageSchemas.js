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
// import society from '@/assets/society.png';
import wef from '@/assets/wef.jpg';

const society =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769734457/Society_For_Family_Health_Logo_1_a5qcrp.png';

export const pageSchemas = {
  home: {
    hero: {
      titleHighlight: 'Healthcare',
      titleMain: 'Advocacy.',
      introLine:
        'We speak with one voice on behalf of the Nigerian Private Health Sector.',
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
        // { label: 'Vision', value: '1' },
        // { label: 'Registered Health Guardians', value: '6+' },
        // { label: 'Partners', value: '5+' },
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
        name: 'Njide Ndili',
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
        name: 'Chinyere Okorocha',
        position: 'Public Relations Secretary, HFN',
        role: 'Head of Sectors, Jackson, Etti & Edu',
        image: chinyere,
      },
      {
        name: 'Olayode Babarinde',
        position: 'Financial Secretary, HFN',
        role: 'Healthcare System Partner – Policy, Roche',
        image: babarinde,
      },
      {
        name: 'Reagan Rowland',
        position: 'Treasurer, HFN',
        role: 'Founder/CEO, OneClick Med',
        image: reagan,
      },
    ],

    faqs: [
      {
        question: 'What paves the Healthcare Federation of Nigeria (HFN) on?',
        answer:
          'HFN is paved on the mission to provide a unified voice for the private healthcare sector in Nigeria, fostering collaboration, promoting best practices, and driving policy change to achieve universal health coverage.',
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
    titleHighlight: 'Championing',
    titleMain: 'Healthcare in Nigeria',
    descriptionTop: 'Healthcare Federation of Nigeria ',
    descriptionText:
      'is a coalition of private healthcare sector stakeholders committed to strengthening Nigeria’s healthcare system through strategic advocacy, collaboration, and private sector leadership.',
    descriptionBottom:
      '',
    ctaLabel: 'Join the Coalition ->',
    ctaLink: '/register',
    image: 'map.jpg',
    backgroundColor: '#f0f7f5',
  },
  story: {
    sectionTitle: 'Our HFN Story',
    paragraphs: [
      'The Healthcare Federation of Nigeria (HFN) is the umbrella body for private healthcare stakeholders in Nigeria, representing the interests of health professionals, companies, investors, associations, and institutions.',
      'HFN provides members with access to advocacy platforms, strategic collaborations, knowledge-sharing, and investment opportunities aimed at building a stronger, more resilient health system.',
    ],
    mission: 'To create an enabling environment for the private healthcare sector in Nigeria through advocacy, partnership, and capacity building.',
    vision: 'A thriving private healthcare sector that contributes significantly to achieving universal health coverage in Nigeria.',
    rolePoints: [
      'Providing a credible, coordinated voice for private sector stakeholders',
      'Ensuring private sector perspectives are embedded in national health policies and reforms',
      'Facilitating constructive public–private collaboration',
      'Supporting reforms that unlock investment and improve service delivery',
    ],
    commitmentGoals: [
      'Policy is informed by evidence and practice',
      'Private sector contributions are coordinated',
      'Investment supports quality and access',
      'Patients remain at the centre of care',
    ],
    image: 'about-us.png',
  },

  items: [
    {
      title: 'Policy Advocacy',
      shortDesc: 'Strategic Engagement.',
      fullDesc:
        'We engage with legislators, regulators, and government institutions to shape evidence-based policies that enable effective regulation, sustainable financing, and private sector participation in health system strengthening.',
      colorClass: 'leaf-green',
    },
    {
      title: 'Stakeholder Convening',
      shortDesc: 'Unified Voice.',
      fullDesc:
        'We bring together healthcare providers, manufacturers, insurers, digital health innovators, development partners, and policymakers to align priorities, share knowledge, and drive collective action.',
      colorClass: 'leaf-tan',
    },
    {
      title: 'Sector Intelligence',
      shortDesc: 'Thought Leadership.',
      fullDesc:
        'We produce research, industry insights, and high-level dialogues that inform policy decisions, investment strategies, and national health discourse.',
      colorClass: 'leaf-green',
    },
    {
      title: 'Public–Private Collaboration',
      shortDesc: 'Practical Solutions.',
      fullDesc:
        'We support partnerships that leverage private sector expertise and resources to improve service delivery, emergency care, health financing, and access to quality healthcare.',
      colorClass: 'leaf-tan',
    },
  ],

  history: {
    title: 'Our History',
    milestones: [
      {
        year: '2015',
        event: 'HFN was established to bring together stakeholders across Nigeria’s private health sector. Today, we are a nationally recognised voice, contributing to major policy reforms and public–private partnerships that have strengthened healthcare delivery across Nigeria.',
      },
    ],
  },

  governance: {
    title: 'Governance & Leadership',
    description:
      'HFN is governed through a structure that includes the Board of Trustees, National Executive Council, Executive Committee, and Secretariat, ensuring accountability and effective execution of its mandate.',
    units: [
      'Board of Trustees',
      'National Executive Council',
      'Executive Committee',
      'Secretariat',
    ],
  },

  leadership: {
    title: 'Our Leadership',
    executives: [
      {
        name: 'Njide Ndili',
        position: 'President, HFN',
        organization: 'Country Director, PharmAccess',
        image: 'njide.png',
        themeColor: '#f0f7f5',
        borderColor: 'border-green-300',
        textColor: 'text-green-700',
        bio: 'Njide Ndili is the Nigeria Country Director at PharmAccess, an international organisation that leverages digital innovation and market-based solutions to strengthen health systems across sub-Saharan Africa. PharmAccess works across both the demand and supply sides of healthcare to improve access, quality, and financial protection. She serves as President of the Healthcare Federation of Nigeria (HFN), where she leads private sector advocacy and engagement to advance policy reforms and strengthen Nigeria’s healthcare system. Njide is also a founding member of the Digital Transformation for Health Lab, which identifies and supports digital technologies that accelerate progress toward Universal Health Coverage, particularly in low- and middle-income countries. In addition, she serves on the Steering Committee of the Nigerian Economic Summit Group (NESG) Health Policy Commission. Njide holds an MSc in Health Economics, Policy, and Management from the London School of Economics, an Advanced Management Programme (AMP) from INSEAD, an MBA from the University of Houston, a Postgraduate Diploma in Finance, and a BSc in Computer Science.',
        quote:
          'True leadership in healthcare is measured not by titles, but by the lives we touch and the systems we transform.',
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/njide-ndili/' },
          { platform: 'twitter', url: 'https://twitter.com/' },
          { platform: 'instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Dr. Ayodele Benson-Cole',
        position: '1st Vice-President, HFN',
        organization: 'CEO, Benson Coleman & Associates',
        image: 'ayodele.png',
        themeColor: '#fcefe7',
        borderColor: 'border-orange-300',
        textColor: 'text-orange-700',
        bio: 'Dr. Ayodele Benson-Cole is a respected physician and healthcare strategist with over 18 years of clinical and administrative experience. He has built a reputation for promoting quality healthcare standards and patient-centered innovations in both urban and underserved communities. Dr. Benson-Cole earned his medical degree from the University of Ibadan and holds certifications in Healthcare Leadership and Quality Improvement. He has served as a consultant to various public health projects and continues to advocate for accessible healthcare systems that prioritize prevention, education, and technology integration.',
        quote:
          'Medicine is not just about curing the sick; it is about inspiring hope, preserving dignity, and leading with compassion.',
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/ayodele-cole-benson-93b79027/' },
          { platform: 'twitter', url: 'https://twitter.com/' },
          { platform: 'instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Dr. Jennifer Anyati',
        position: '2nd Vice President, HFN',
        organization: 'Deputy Managing Director, Society for Family Health',
        image: 'jennifer.png',
        themeColor: '#f0f7f5',
        borderColor: 'border-green-300',
        textColor: 'text-green-700',
        bio: 'Dr. Jennifer Anyati is a dynamic public health professional and advocate for equitable healthcare delivery. With a strong background in epidemiology and healthcare planning, she has led numerous community health programs aimed at improving maternal and child health outcomes. Her work emphasizes the power of data-driven decision-making and collaboration between government, private, and non-profit sectors. Dr. Anyati has also served as a mentor to emerging healthcare practitioners, encouraging innovation and ethical practice in all aspects of healthcare delivery.',
        quote:
          'When we uplift communities through healthcare, we heal not just individuals but the future of our nation.',
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/jennifer-anyanti/' },
          { platform: 'twitter', url: 'https://twitter.com/' },
          { platform: 'instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Chinyere Okorocha',
        position: 'Public Relations Secretary, HFN',
        organization: 'Head of Sectors, Jackson, Etti & Edu',
        image: 'chinyere.png',
        themeColor: '#fcefe7',
        borderColor: 'border-orange-300',
        textColor: 'text-orange-700',
        bio: 'Mrs. Chinyere Okorocha is an accomplished communications professional with over 15 years of experience in healthcare public relations and stakeholder engagement. She has successfully managed campaigns that increased public awareness about preventive health, vaccination, and patient rights. Her expertise lies in crafting clear and empathetic messages that bridge the gap between healthcare providers and the public. Mrs. Okorocha believes that effective communication is vital to trust, transparency, and health system strengthening.',
        quote:
          'When people understand healthcare, they make choices that transform lives — communication is the heartbeat of progress.',
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/chinyere-okorocha-a1bb19bb/' },
          { platform: 'twitter', url: 'https://twitter.com/' },
          { platform: 'instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Olayode Babarinde',
        position: 'Financial Secretary, HFN',
        organization: 'Healthcare System Partner – Policy, Roche',
        image: 'babarinde.png',
        themeColor: '#f0f7f5',
        borderColor: 'border-green-300',
        textColor: 'text-green-700',
        bio: 'Mr. Babarinde Olayode is a certified finance professional with over 12 years of experience managing budgets, investments, and financial systems within the healthcare sector. His strategic financial planning has enabled organizations to allocate resources efficiently while maintaining accountability and transparency. With a background in Accounting and an MBA in Health Economics, Mr. Olayode is passionate about improving financial sustainability in healthcare institutions and driving innovations in health financing.',
        quote:
          'Financial integrity in healthcare is not just about numbers — it’s about ensuring every naira spent saves a life.',
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/olayode-babarinde-26863276/' },
          { platform: 'twitter', url: 'https://twitter.com/' },
          { platform: 'instagram', url: 'https://instagram.com/' },
        ],
      },
      {
        name: 'Reagan Rowland',
        position: 'Treasurer, HFN',
        organization: 'Founder/CEO, OneClick Med',
        image: 'reagan.png',
        themeColor: '#fcefe7',
        borderColor: 'border-orange-300',
        textColor: 'text-orange-700',
        bio: 'Mr. Reagan Rowland is a results-oriented finance administrator dedicated to promoting accountability and fiscal discipline in the healthcare industry. With over a decade of experience in financial management and audit processes, he has supported several healthcare organizations in achieving operational excellence through strategic cost control and transparent reporting. He is known for his collaborative leadership and ability to translate financial insights into actionable growth strategies that strengthen healthcare systems.',
        quote:
          'Transparency is the foundation upon which trust and progress in healthcare are built.',
        socials: [
          { platform: 'linkedin', url: 'https://www.linkedin.com/in/reagan-rowland/' },
          { platform: 'twitter', url: 'https://twitter.com/' },
          { platform: 'instagram', url: 'https://instagram.com/' },
        ],
      },
    ],
  },

  ctaSection: {
    title: 'Our Core Mandates',
  },
},

  contact: {
    hero: {
      headline: 'Get in touch with HFN Nigeria',
      subheadline:
        'Healthcare Federation of Nigeria (HFN) welcomes enquiries from members, partners, policymakers, development organisations, media, and individuals interested in engaging with our work.',
      description: 'Our team typically responds within 24 hours.',
      image: 'globe.png',
      badgeText: 'Connect With Us',
      backgroundColor: 'bg-[#F2F9F3]',
    },

    form: {
      title: 'Contact Us',
      description:
        'Whether you are seeking information about membership, partnerships, events, advocacy, or general enquiries, our team is available to assist.',
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
          placeholder: 'Enter subject',
          required: true,
        },
        {
          id: 'message',
          label: 'Message',
          type: 'textarea',
          placeholder: 'Write your message...',
          rows: 5,
          required: true,
        },
      ],
      submitButtonText: 'Send Message',
      successMessage:
        'Thank you for reaching out. Our team will get back to you within 24 hours.',
    },

    contactDetails: {
      address: {
        text: '109, Awolowo Road, Ikoyi, Opposite Standard Chartered Bank, Lagos.',
        googleMapsUrl:
          'https://maps.google.com/maps?q=109+Awolowo+Road,+Ikoyi,+Lagos,+Nigeria',
      },
      emails: [
        {
          label: 'General Inquiries',
          address: 'info@hfnigeria.com',
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
          url: 'https://www.instagram.com/hfn_nigeria?igsh=MWR1ODI1aW5kaWwyaA==',
          icon: 'fab fa-square-instagram',
        },
        {
          platform: 'LinkedIn',
          url: 'https://www.linkedin.com/company/healthcare-federation-of-nigeria-hfn/posts/?feedView=all',
          icon: 'fa-brands fa-linkedin',
        },
        {
          platform: 'Twitter/X',
          url: 'https://x.com/hfn_nigeria',
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
    titleLine1: 'Engage With HFN',
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

    note:
      'Contributions are voluntary and support institutional activities aligned with HFN’s mission.',

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
    backgroundColor: '#14532D', // green-900
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
},

  membership: {
  hero: {
    headlineTop: 'Engagement Access Quality',
    headlineBottom: 'A coalition driving policy and innovation',
    description:
      'Membership of the Healthcare Federation of Nigeria (HFN) provides access to a trusted professional network that strengthens private sector participation in policy, investment, and health system reform. HFN members engage through structured advocacy platforms, strategic partnerships, and sector-wide collaborations that shape Nigeria’s healthcare landscape.',
    image: 'membership.jpg',
  },

  sectionTitle: 'Membership Categories',

  categories: [
    {
      id: 'individual',
      name: 'Individual',
      description: 'Ideal for private and insurance companies',
      plans: [
        {
          title: 'Individual',
          price: '₦50,000 per year',
          audience: 'Ideal for private companies',
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
    },
    {
      id: 'association',
      name: 'Association',
      description: 'For registered professional or trade associations',
      plans: [
        {
          title: 'Association Member',
          price: '₦150,000 per year',
          audience: 'Ideal for professional bodies',
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
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Ideal for private and insurance companies',
      plans: [
        {
          title: 'Corporate',
          price: '₦200,000 per year',
          audience: 'Ideal for private companies',
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
    },
    {
      id: 'multinational',
      name: 'Multinational',
      description: 'Designed for international and cross-border organizations',
      plans: [
        {
          title: 'Global Partner',
          price: '₦750,000 per year',
          audience: 'Ideal for international firms',
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
    },
    {
      id: 'diaspora',
      name: 'Diaspora',
      description:
        'For professionals or organizations abroad supporting local development',
      plans: [
        {
          title: 'Diaspora Partner',
          price: '$50 per year',
          audience: 'Ideal for Nigerians in diaspora',
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
    },
  ],

  valuePropositionTabs: [
    {
      id: 'policy',
      name: 'Policy Influence and Advocacy.',
      titleHtml: 'Policy Influence <br />and Advocacy.',
      color: 'default',
      contentHtml: `
        <p>
          <strong>Representation in Policy and Decision-Making:</strong>
          Members are represented in high-level national health policy
          discussions through HFN’s recognized advocacy platforms.
        </p>
        <p>
          <strong>Policy Advocacy:</strong> As the officially recognized
          body for the private health sector, HFN maintains close rapport
          with government policymakers while ensuring constant feedback on
          critical health matters.
        </p>
        <p>
          <strong>Improvement of the Operating Environment:</strong> HFN
          actively engages in lobbying and advocacy to create a more
          enabling and sustainable environment for healthcare operations.
        </p>
        <p>
          <strong>Opportunity to Shape the Future:</strong> Members enjoy
          ongoing opportunity to contribute to shaping the policies and
          frameworks that determine the fortunes of Nigeria’s healthcare
          sector.
        </p>
      `,
    },
    {
      id: 'collaboration',
      name: 'Collaboration, Networking, and Exposure.',
      titleHtml: 'Collaboration, <br />Networking, <br />and Exposure.',
      color: 'orange',
      contentHtml: `...same exact HTML as page...`,
    },
    {
      id: 'knowledge',
      name: 'Information, Knowledge, and Capacity Development.',
      titleHtml: 'Information, Knowledge, <br /> and Capacity Development.',
      color: 'green',
      contentHtml: `...same exact HTML as page...`,
    },
    {
      id: 'digital',
      name: 'Digital and Media Visibility.',
      titleHtml: 'Digital and <br />Media Visibility.',
      color: 'orange',
      contentHtml: `...same exact HTML as page...`,
    },
    {
      id: 'support',
      name: 'Member Support, Benefits, and Privileges.',
      titleHtml: 'Member Support, Benefits, <br /> and Privileges.',
      color: 'green',
      contentHtml: `...same exact HTML as page...`,
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
      filters: ['January 2026', 'December 2025', 'November 2025'],
      articles: [
        {
          id: 1,
          title:
            'Driving Nigeria Toward Universal Health Coverage - 1st December, 2025',
          excerpt:
            'Driving Nigeria Toward Universal Health Coverage: A Landmark HFN–NHIA Private Sector Roundtable, theme: Leveraging the Private Sector to Accelerate Health Insurance Coverage in Nigeria - 1st December, 2025',
          image:
            'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715457/16268da44f149e859e5069f5fcdbf9fb_S_j9rsms.jpg',
          date: 'December 1, 2025',
          description: `The Healthcare Federation of Nigeria (HFN), in partnership with the  National Health Insurance Authority (NHIA),hosted a high-impact Private Sector Roundtable Breakfast Meeting today in Lagos. More than a stakeholder engagement, the event marked a decisive step in reshaping Nigeria’s health insurance landscape, uniting participants around one shared ambition: accelerating coverage through bold private sector leadership.

The session featured a strong in-person turnout and an equally engaged virtual audience from across the globe. Key participants included: Dr Kelechi Ohiri(Director General, NHIA), Wale-Smatt Oyerinde, MCIPM, FMINILS (Director General, NECA), ably represented, Dr Leke Oshunniyi (Chairman, HMCAN), Dr Funmi Adewara (CEO & Founder, Mobihealth International), Dr Segun Ebitanmi (CEO, CareOne Digital Hospitals), Dr Yetunde Ayo-Oyalowo (CEO & Founder, Market Doctors), and Muhammed Gidado (Medtronic)

The dialogue highlighted the ecosystem’s collective commitment to transforming Nigeria’s health financing future.
 Key Takeaways

• Strong Policy Direction from NHIA
Dr. Kelechi Ohiri provided a clear roadmap for expanded health coverage, ranging from enforcing mandatory insurance, rebuilding trust, deepening awareness, and innovating models to reach the informal sector. His commitment to co-creating solutions with the private sector was both actionable and appreciated.

• Private Sector Mobilisation Led by HFN
HFN President and Country Director PharmAccess Nigeria, Njide Ndili, reinforced the critical role of private sector collaboration, highlighting:
⚡ HFN’s inclusion in the UHC Compact
⚡ New strategic MOUs
⚡ The importance of private sector accountability in system strengthening
Her call to move from “pointing fingers” to “co-creating solutions” set the tone for a highly productive dialogue.

The session produced a consensus on strategic priorities:

• Enforcing Mandatory Health Insurance with clear mechanisms and timelines
• Digital Enablement at Scale, including interagency data sharing and unified APIs
• Innovative Micro-Insurance Models for Nigeria’s informal sector
• Strengthening PHC Systems in collaboration with ALGON and state PHC agencies
• Domestic Resource Mobilisation, leveraging fintechs, PPPs, and tax mechanisms
• Quality and Trust Building through SafeCare standards and improved patient experience
• Structured Public–Private Engagement, with HFN as a central coordinating hub

A Technical Working Group will be set up with some Clear deliverables to be achieved in 2026

We extend our appreciation to Dr Kelechi Ohiri and the NHIA team for their leadership, clarity, and collaborative spirit. Our valued partners and sponsors, Health and Managed Care Association of Nigeria - HMCAN, Medtronic, and AIICO Multishield Limited
`,
          commentCount: 0,
          link: '/news/lagos-emergency-partnership',
          slug: 'driving-nigeria-toward-universal-health',
          tag: 'News',
        },
        {
          id: 2,
          title:
            'Driving the Digital Health Agenda Forward at #GDHF2025 - 5th December, 2025',
          excerpt:
            'At the Global Digital Health Forum 2025 in Nairobi, the President Healthcare Federation of Nigeria and Country Director PharmAccess Nigeria, Njide Ndili, a Founding Member of the Digital Transformation for Health Lab(DTH-Lab), delivered a powerful keynote on: Digital Determinants of Health Framework.',
          image:
            'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769715460/84d92881fff843d7a1d8f64ef8dce88f_M_pufrzc.jpg',
          date: 'December 5, 2025',
          commentCount: 0,
          description: `At the Global Digital Health Forum 2025 in Nairobi, the President Healthcare Federation of Nigeria and Country Director PharmAccess Nigeria, Njide Ndili, a Founding Member of the Digital Transformation for Health Lab(DTH-Lab), delivered a powerful keynote on:
Digital Determinants of Health Framework.

Her presentation underscored a critical message: digital systems are no longer optional layers in health; they are now core determinants that shape equity, access, safety, and well-being.

She underscored the following critical actions:

✅ Addressing digital determinants must become a public health priority
✅ Close digital divides and extend benefits of digitalisation to all
✅ Closer collaboration between groups working on digital health, online safety and digital/AI governance
✅ The health sector must be at the table in shaping new policies and laws to tackle digital determinants and hold industry to account
✅ Learn lessons from other public health challenges to address risks of technology use and boost digital well-being
✅ Digital citizenship for health - empower people to use technology in ways that improve health

As digitalisation rapidly transforms health systems, leaders like Njide Ndili are helping chart the frameworks, conversations, and policies needed to protect populations and strengthen resilience.

Her contribution today is a reminder that the future of public health will be shaped not only by medical advancements but by how effectively we govern, use, and democratise digital tools.


`,
          link: '/news/digital-health-convention',
          slug: 'driving-the-digital-health',
          tag: 'News',
        },
        {
          id: 3,
          title: 'UHC Day 2025 High-Level Convening - 11th December, 2025',
          excerpt:
            'Quality on the supply side is the single most important lever to unlock demand for health insurance and finally make Universal Health Coverage real.',
          image: 'group1.png',
          date: 'December 11, 2025',
          description: `Quality on the supply side is the single most important lever to unlock demand for health insurance and finally make Universal Health Coverage real.
At the UHC Day 2025 High-Level Convening, themed “Unaffordable health cost? We are sick of it,” the President Healthcare Federation of Nigeria (HFN) and Country Director PharmAccess Nigeria, Njide Ndili, delivered a clear and compelling message:
Nigeria cannot achieve Universal Health Coverage without strengthening supply-side quality and scaling the solutions that already work.
 
In her remarks, Njide emphasized that quality is the catalyst that unlocks trust, stimulates demand for health insurance, and drives sustainable financing. She further highlighted the urgent need for coordinated public–private action to close the gaps that continue to burden millions of Nigerians.
 
She also underscored the concrete progress HFN has made in advancing UHC through collaboration, advocacy, and real-world implementation:
 
✅ HFN is now a co-signatory to Nigeria’s first UHC Compact, securing a national KPI for private-sector contribution; a historic milestone.
✅ Private sector participation in BHCPF was achieved for the first time, enabling eligible private facilities to deliver PHC services at scale.
✅ HFN-led PPP in Delta State revitalized 15 PHCs from non-functional to fully operational, recording zero maternal mortality over three years, a model now before the Governors’ Forum for national replication.
✅ HFN initiated collaboration with NCDC to integrate private-sector data into national emergency preparedness systems.
✅ HFN secured major policy wins, including the VAT waiver on pharmaceutical APIs and improved customs processes that reduce the cost of care.
✅ Through our MoU with PVAC, private providers have begun accessing new streams of investment capital.
✅ HFN mobilized private sector engagement with NHIA, driving innovation to reach the informal sector through technology-enabled insurance models.
✅ We continue to push systemic reforms in power, supply chain, strategic purchasing, and quality-linked financing to strengthen the entire healthcare value chain.
 
Njide reiterated that HFN’s mission remains consistent: to ensure that the private sector is fully integrated into national UHC strategy and that proven, high-quality, scalable models are replicated across the country.
 
As she noted, the pathway to UHC requires bold decisions, aligned incentives, and collective action. HFN remains committed to leading with evidence, partnership, and solutions that improve access, affordability, and quality for all Nigerians.
`,
          commentCount: 0,
          link: '/news/kaduna-solar-clinics',
          slug: 'uhc-day-2025-high-level-convening',
          tag: 'News',
        },
        {
          id: 4,
          title:
            'NCDC Private Sector Engagement Roundtable on National Health Security - 5th December, 2025',
          excerpt:
            'The Nigeria Centre for Disease Control and Prevention (NCDC) convened a high-level Private Sector Engagement Roundtable focused on strengthening national health security through strategic collaboration.',
          image: 'wef.jpg',
          date: 'December 5, 2025',
          commentCount: 0,
          description: `The Nigeria Centre for Disease Control and Prevention (NCDC) convened a high-level Private Sector Engagement Roundtable focused on strengthening national health security through strategic collaboration. Healthcare Federation of Nigeria(HFN) was duly represented by Dr Benson Ayodele Cole(First Vice President 1), Mr Olufemi Akingbade(Executive Secretary), and Uchechi Amiloat the session.

The keynote address, “Nigeria's National Health Security Agenda: Gaps, Needs and Opportunities for Private Sector Collaboration”, was delivered by the Director-General of the NCDC, Dr Jide Idris, outlining urgent national priorities and partnership opportunities. This was complemented by an insightful presentation from Abiola Oshunniyon Nigeria’s health security needs and partnership pathways.

An educative panel session titled “Beyond CSR: Building Sustainable Private Sector Co-Investment in National Health Security” featured:
Dr Benson Ayodele Cole(HFN) as Moderator and distinguished panellists, Prof. Lere Baale(Business School of Netherlands), Dr Babatunde Ipaye(Pelton Global Services Limited), Dr Mories Atoki(Africa Business Coalition for Health), Mrs Odunayo Sanyam(MTN Foundation)

Key Outcomes & Insights:
✅ Strengthening epidemic preparedness and response must become a national and private sector priority.
✅ Nigeria must reconsider how healthcare budgets are allocated to drive measurable impact.
✅ Consensus that *health security cannot be achieved without meaningful private sector participation*
✅ Public–private partnerships should deliver dual benefits; supporting government needs while ensuring private sector value.
✅ Proposal to develop a national *Health Grid Dashboard* for real-time health statistics and decision-making.
✅ Agreement to establish a *Technical Working Group (TWG)* with short-, medium-, and long-term goals.
✅ Need to create a comprehensive *stakeholder map* for coordinated engagement.
✅ Critical gaps in PPP; funding flows, coordination, capacity gaps, and accountability must be addressed to improve outcomes.

The roundtable reinforced the urgency of collaborative investment and structured partnership models to build a resilient health security system for Nigeria.`,
          link: '/news/wef-health-innovators',
          slug: 'ncdc-private-sector-engagement-roundtable',
          tag: 'News',
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
          slug: 'strengthening-emergency-healthcare',
          tag: 'News',
        },
        {
          id: 2,
          title: 'Policy Framework for Health Technology Adoption',
          description:
            'HFN’s Policy and Advocacy team released a new white paper encouraging structured regulation and faster adoption of digital health tools in clinical settings.',
          image: 'hands1.png',
          link: '#',
          slug: 'policy-framework-for-health',
          tag: 'News',
        },
        {
          id: 3,
          title: 'Public-Private Dialogue on Universal Health Coverage (UHC)',
          description:
            'Stakeholders met in Abuja to evaluate funding mechanisms and policy frameworks driving Nigeria’s progress toward universal access to affordable healthcare.',
          image: 'hands2.png',
          link: '#',
          slug: 'public-private-dialogue',
          tag: 'News',
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
    title: 'Newsletters',
    items: [
      {
        id: 1,
        date: 'October 3, 2024',
        text: 'Q4 Quarterly Newsletter, 2024 (October-December, 2024)',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067784/hfn-quarterly-newsletter-q-4_2024_rqpvhf.pdf',
      },
      {
        id: 2,
        date: 'February 27, 2025',
        text: 'Q1 Quarterly Newsletter, 2025 (January-March, 2025)',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067784/1st-quarter-2025-hfn-newsletter1_nznhgn.pdf',
      },
      {
        id: 3,
        date: 'April 7, 2025',
        text: 'Q2 Quarterly Newsletter, 2025 (April-June, 2025)',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067784/hfn-quarterly-newsletter-q-2---2025_jfakrt.pdf',
      },
      {
        id: 4,
        date: 'July 2, 2025',
        text: 'Q3 Quarterly Newsletter, 2025 (July-September, 2025)',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067785/2025-hfn-quarterly-newsletter-q3_g4ks3t.pdf',
      },
      {
        id: 5,
        date: 'October 8, 2025',
        text: 'Q4 Quarterly Newsletter, 2025 (October-December, 2025)',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067786/2025-hfn-quarterly-newsletter-q4_gd0aj6.pdf',
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 2,
      nextPageUrl:
        'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067797/IMPACT_REPORT_-_Updated_p18np1.pdf',
    },
  },

  publicationsSection: {
    title: 'Publications',
    backgroundColor: '#F2F9F3',
    items: [
      {
        id: 1,
        title:
          'Transforming Nigeria’s Healthcare Landscape Through Strategic Advocacy and Private Sector Leadership',
        description:
          'HFN is uniquely positioned to leverage its deep understanding of both the healthcare sector and the policy landscape to facilitate transformative change. We have the expertise to connect public and private sectors, mobilize financing, and advocate for reforms that drive long-term, sustainable growth in the healthcare industry.',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067797/IMPACT_REPORT_-_Updated_p18np1.pdf',
      },
      {
        id: 2,
        title:
          'THE HEALTHCARE FEDERATION OF NIGERIA In partnership with WHX Lagos',
        description:
          'The 2025 Healthcare Leadership Conference hosted by the Healthcare Federation of Nigeria (HFN), in partnership with WHX Lagos, themed “Accelerating UHC and Health Sovereignty: Scaling Up Best Practices Through Public-Private Integration,” convened distinguished leaders, policymakers, and system innovators to advance Nigeria’s journey toward Universal Health Coverage (UHC) and health sovereignty. The conference delivered not just vision, but actionable roadmaps.',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067796/2025-hfn-hlc-report_fyxosp.pdf',
      },
      {
        id: 3,
        title:
          'Expanding Access to Quality Healthcare: Transforming Nigeria through Innovation, Partnership, and Sustainability',
        description:
          'The 2025 Annual General Conference of the Healthcare Federation of Nigeria (HFN) was a landmark gathering convened to commemorate a decade of transformative advocacy, sectoral leadership, and policy influence by the private healthcare sector in Nigeria.',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067793/2025-hfn-conference-report_hapfj9.pdf',
      },
      {
        id: 4,
        title:
          'High-Level Roundtable on Local Manufacturing of Medicines in Nigeria',
        description:
          'The Healthcare Federation of Nigeria (HFN), in collaboration with the West Africa Private Healthcare Federation (FOASPS), the Presidential Initiative for Unlocking the Healthcare Value Chain (PVAC), the African Union Development Agency (AUDA-NEPAD), and the World Bank, convened a High-Level Roundtable on Local Manufacturing of Medicines in Nigeria on Wednesday, October 22, 2025, in Abuja.',
        pdfUrl:
          'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770067783/hfn-report_roundtable-on-local-manufacturing_esqq68.pdf',
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 2,
    },
  },
},

};

