// import ayodele from '@/assets/ayodele.png';
// import babarinde from '@/assets/babarinde.png';
// import bridge from '@/assets/bridge.png';
// import chinyere from '@/assets/chinyere.png';
// import emzor from '@/assets/emzor.png';
// import event from '@/assets/event.png';
// import group from '@/assets/group.png';
// import hba from '@/assets/hba-africa.png';
// import health from '@/assets/health.png';
// import hfn_partner from '@/assets/hfn_partner.png';
// import jennifer from '@/assets/jennifer.png';
// import njide from '@/assets/njide.png';
// import oando from '@/assets/oando_logo.png';
// import pharm from '@/assets/pharm.png';
// import reagan from '@/assets/reagan.png';
// import wef from '@/assets/wef.jpg';
import { homePageSchema } from './pages/home.schema.js';
import { aboutPageSchema } from './pages/about.schema.js';
import { governanceSchema } from './pages/governance.schema.js';
import { galleryPageSchema } from './pages/gallery.schema.js';
import { getInvolvedPageSchema } from './pages/getInvolve.schema.js';
import { membershipPageSchema } from './pages/membership.schema.js';
import { contactPageSchema } from './pages/contact.schema.js';
import { eventsPageSchema } from './pages/events.schema.js';


const eventImage =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769883047/events-CNRYrGt8_trfhaz.png';
const breakfast2025 =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881263/1758712162657_yclv7p.jpg';
const roundtable2025 =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881265/1764355254559_g2wv3t.jpg';
const hfn2025 =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881267/1746181486545_mtao0s.jpg';
const latestHero =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770045591/243A7993_wxlzkg.jpg';
const society =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769734457/Society_For_Family_Health_Logo_1_a5qcrp.png';
const handsJoining =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769896360/IMG_9238_vxq385.jpg';
const chairImage =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769894247/Bola_Adesola_lr8vif.png';

export const pageSchemas = {
  home: homePageSchema,
  about: aboutPageSchema,
  governance: governanceSchema,
  gallery: galleryPageSchema,
  getinvolved: getInvolvedPageSchema,
  contact: contactPageSchema,
  events: eventsPageSchema,  
  member: membershipPageSchema,

  latestnews: {
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
