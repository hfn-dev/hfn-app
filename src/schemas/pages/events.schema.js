const latestHero =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1770045591/243A7993_wxlzkg.jpg';
const eventImage =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769883047/events-CNRYrGt8_trfhaz.png';
const breakfast2025 =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881263/1758712162657_yclv7p.jpg';
const roundtable2025 =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881265/1764355254559_g2wv3t.jpg';
const hfn2025 =
  'https://res.cloudinary.com/pou7gd5q41xc/image/upload/v1769881267/1746181486545_mtao0s.jpg';

export const eventsPageSchema = {
  events: {
    hero: {
      titleLine1: 'Events/Engagements',

      titleLine2: 'Speaking with one voice for the private health sector',

      description:
        "Stay updated with our latest conferences, webinars, and community programs. Whether you're looking to expand your knowledge, network with industry leaders, or engage with our vibrant community, there's an event for you.",

      image: latestHero,

      backgroundColor: '#E87A1814',
    },

    searchAndFilter: {
      title: 'Find event',

      searchPlaceholder: 'Search',

      years: ['2026', '2025', '2024'],

      categories: [
        'Category',
        'Webinar',
        'Conference',
        'Roundtable',
        'Workshop',
      ],
    },


    featuredEvent: {
      tag: 'Members Only',

      title: '2026 HFN Annual Conference',

      date: 'Wednesday, March 4th 2026',

      location: 'Lagos Oriental Hotel Lagos, LA',

      description:
        'Join HFN 2026 to explore bold private‑sector solutions driving healthcare financing and Universal Health Coverage in Nigeria. The Healthcare Federation of Nigeria (HFN) invites you to the HFN Annual Conference 2026, Nigeria’s premier gathering of private-sector healthcare leaders, policymakers, financiers, innovators, and development partners.',

      image: eventImage,

      registerLink: 'https://tix.africa/claim/2026-hfn-annual-conference/...',
    },


    latestEvents: {
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
            'Join HFN 2026 to explore bold private‑sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.',

          image: eventImage,

          registerLink:
            'https://tix.africa/discover/2026-hfn-annual-conference',
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
            'Join HFN 2026 to explore bold private‑sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.',

          image: eventImage,

          registerLink:
            'https://www.eventbrite.com/e/2026-hfn-annual-conference-tickets-1980514831174?aff=oddtdtcreator',
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
            'Join HFN 2026 to explore bold private‑sector solutions driving healthcare financing and Universal Health Coverage in Nigeria.',

          image: eventImage,

          registerLink:
            'https://tix.africa/discover/2026-hfn-annual-conference',
        },
      ],
    },

    pastEvents: {
      title: 'Past Events',

      items: [
        {
          title: 'HFN Healthcare Leadership Conference 2025',

          category: 'Conference',

          date: 'June 2, 2025',

          theme:
            'Accelerating UHC and Health Sovereignty Through Public-Private Integration',

          image: hfn2025,
        },

        {
          title:
            'High-Level Roundtable on Local Manufacturing of Medicines in Nigeria',

          category: 'Roundtable',

          date: 'October 22, 2025',

          theme:
            'Strengthening Local Pharmaceutical Manufacturing for Sustainable Health Security in Africa',

          image: roundtable2025,
        },

        {
          title: 'HFN–NHIA Private Sector Roundtable Breakfast Meeting',

          category: 'Roundtable',

          date: 'December 1, 2025',

          theme:
            'Leveraging Private Sector to Accelerate Health Insurance Coverage in Nigeria',

          image: breakfast2025,
        },
      ],
    },
  },
  
};
