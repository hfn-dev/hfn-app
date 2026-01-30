import bridge from '@/assets/bridge.png';
import emzor from '@/assets/emzor.png';
import group from '@/assets/group.png';
import health from '@/assets/hfn-news5.PNG';
import wef from '@/assets/hfn-news6.PNG';
import event from '@/assets/hfn-news7.PNG';
import hfn_partner from '@/assets/hfn_partner.png';

import hba from '@/assets/hba-africa.png';
import oando from '@/assets/oando_logo.png';
import pharm from '@/assets/pharm.png';
// import society from '@/assets/society.png';

import ayodele from '@/assets/ayodele.png';
import babarinde from '@/assets/babarinde.png';
import chinyere from '@/assets/chinyere.png';
import jennifer from '@/assets/jennifer.png';
import njide from '@/assets/njide.png';
import reagan from '@/assets/reagan.png';


const society = 'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769734457/Society_For_Family_Health_Logo_1_a5qcrp.png';
export const homePageSchema = {
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
      'December 2025': {
        featured: {
          image: hfn_partner,
          tag: 'Programs & Initiatives',
          date: 'December 1, 2025',
          comments: 0,
          description:
            'The Healthcare Federation of Nigeria (HFN), in partnership with the  National Health Insurance Authority (NHIA),hosted a high-impact Private Sector Roundtable Breakfast Meeting today in Lagos. More than a stakeholder engagement, the event marked a decisive step in reshaping Nigeria’s health insurance landscape, uniting participants around one shared ambition: accelerating coverage through bold private sector leadership.',
        },
        newsList: [
          {
            image: health,
            tag: 'Programs & Initiatives',
            date: 'December 15, 2025',
            comments: 12,
            description:
              'Driving the Digital Health Agenda Forward at #GDHF2025.',
          },
          {
            image: wef,
            tag: 'Health Alert',
            date: 'December 5, 2025',
            comments: 5,
            description:
              'The Nigeria Centre for Disease Control and Prevention (NCDC) convened a high-level Private Sector Engagement Roundtable focused on strengthening national health security through strategic collaboration. Healthcare Federation of Nigeria(HFN) was duly represented by Dr Benson Ayodele Cole(First Vice President 1), Mr Olufemi Akingbade(Executive Secretary), and Uchechi Amiloat the session.',
          },
          {
            image: event,
            tag: 'Public Health Stories',
            date: 'December 10, 2025',
            comments: 10,
            description:
              'The Digital Health Revolution is reshaping how Africa delivers, finances, and experiences healthcare. To unlock real investment in the continent’s HealthTech ecosystem, innovators, providers, regulators, and funders must align behind a shared transformation agenda. Digital innovation is no longer optional; it’s a strategic imperative for achieving Universal Health Coverage (UHC).',
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
};
