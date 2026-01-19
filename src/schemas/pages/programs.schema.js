export const programsPageSchema = {
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
};
