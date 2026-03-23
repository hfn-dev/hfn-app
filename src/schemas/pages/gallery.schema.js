export const galleryPageSchema = {
    hero: {
      titleLine1: "Event Gallery",
      titleLine2: "Relive Our Moments",
      description: "Explore the highlights of our past conferences, workshops, and community engagements. Witness the impact and the vibrant energy of our network in action.",
      image: "latest_news.png",
      backgroundColor: "#E87A1814"
    },

    filtering: {
      title: "Filter Memories",
      years: ["2026", "2025", "2024"],
      categories: [
        "Conferences", 
        "Workshops", 
        "Community Outreaches", 
        "Webinar", 
        "Gala"
      ]
    },

    galleryList: {
      items: [
        {
          id: 1,
          title: "Digital Skills Bootcamp 2025",
          category: "Workshop",
          date: "November 20, 2025",
          image: "awards.png",
          year: "2025"
        },
        {
          id: 2,
          title: "Women in Tech Summit",
          category: "Conference",
          date: "December 5, 2025",
          image: "latest_news.png",
          year: "2025"
        },
        {
          id: 3,
          title: "Community Outreach Lagos",
          category: "Social",
          date: "October 12, 2025",
          image: "awards.png",
          year: "2025"
        },
        {
          id: 4,
          title: "Health & Wellness Webinar",
          category: "Webinar",
          date: "January 12, 2026",
          image: "latest_news.png",
          year: "2026"
        },
        {
          id: 5,
          title: "Annual Leadership Awards",
          category: "Gala",
          date: "December 20, 2025",
          image: "awards.png",
          year: "2025"
        },
        {
          id: 6,
          title: "Tech Innovation Expo",
          category: "Conference",
          date: "March 15, 2026",
          image: "latest_news.png",
          year: "2026"
        }
      ],
      hasMore: true,
      nextCursor: 2
    }
};
