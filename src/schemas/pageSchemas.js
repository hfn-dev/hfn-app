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
import { newsPageSchema } from './pages/news.schema.js';
import { resourcesPageSchema } from './pages/resources.schema.js';


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
  latestnews: newsPageSchema,
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
  resources: resourcesPageSchema,
};
