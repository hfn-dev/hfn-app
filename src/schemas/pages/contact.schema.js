export const contactPageSchema = {
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
        text: '109, Awolowo Road, Ikoyi, Opposite Standard Chartered Bank, Lagos.',
        googleMapsUrl: 'https://maps.google.com/...',
      },
      emails: [
        { label: 'General Inquiries', address: 'info@hfnigeria.com' },
        // {
        //   label: 'Executive Secretary',
        //   address: 'executivesecretary@hfnigeria.com',
        // },
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
};
