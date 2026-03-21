export const footerSchema = {
  // Brand & Contact Information
  contact: {
    address: `3rd floor, 109, Awolowo Road, \nOpposite Standard Chartered \nBank, Ikoyi, Lagos State, Nigeria`,
    email: "info@hfnigeria.com",
    phone: "+234 703 056 7554",
    phoneLink: "tel:+2347030567554"
  },

  // Dynamic Navigation Columns
  navColumns: [
    {
      title: "Home",
      links: [
        { label: "Event Calendar", url: "/#calendar" },
        { label: "FAQ", url: "/#faq" }
      ]
    },
    {
      title: "About Us",
      links: [
        { label: "Why join HFN", url: "/about" }
      ]
    },
    {
      title: "Latest Updates",
      links: [
        { label: "Programs and Initiatives", url: "/programs" },
        { label: "News & Advocacy", url: "/news" },
        { label: "Resources", url: "/resources" },
        { label: "Events", url: "/events" }
      ]
    },
    {
      title: "Membership",
      links: [
        { label: "Member Area", url: "/membership" },
        { label: "Get Involved", url: "/get-involved" }
      ]
    }
  ],

  // Social Media Links
  socials: [
    { platform: "Instagram", url: "https://www.instagram.com/hfn_nigeria", icon: "fab fa-square-instagram" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/healthcare-federation-of-nigeria-hfn", icon: "fa-brands fa-linkedin" },
    { platform: "Twitter", url: "https://x.com/hfn_nigeria", icon: "fab fa-square-x-twitter" }
  ],

  // Legal Links (Right aligned)
  legal: [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Service", url: "/terms" }
  ],

  // Copyright Text (Dynamic Year is handled in code, but text can be here)
  copyrightSuffix: "Healthcare Federation of Nigeria. All Rights Reserved."
};
