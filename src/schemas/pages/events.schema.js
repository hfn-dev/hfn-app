export const eventsPageSchema = {
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
      registerLink: 'https://tix.africa/discover/2026-hfn-annual-conference',
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
          registerLink: 'https://tix.africa/discover/2026-hfn-annual-conference',
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
          registerLink: 'https://www.eventbrite.com/e/2026-hfn-annual-conference-tickets-1980514831174?aff=oddtdtcreator',
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
          registerLink: 'https://tix.africa/discover/2026-hfn-annual-conference',
        },
      ],
    },
  },
};
